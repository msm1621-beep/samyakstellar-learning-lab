import { useEffect, useRef } from 'react';

const EnhancedStarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star configuration
    interface Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkleSpeed: number;
      twinklePhase: number;
      color: string;
    }

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
    }

    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    
    // Color palette for stars
    const starColors = [
      '#ffffff', // White
      '#fff4e0', // Warm white
      '#e0e8ff', // Cool white
      '#ffd4e0', // Pink tint
      '#d4e8ff', // Blue tint
      '#fff9d4', // Yellow tint
    ];

    // Create stars
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Create some larger, brighter stars
    for (let i = 0; i < 20; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.3 + 0.6,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * 3)],
      });
    }

    // Initialize shooting stars pool
    for (let i = 0; i < 3; i++) {
      shootingStars.push({
        x: 0,
        y: 0,
        length: 0,
        speed: 0,
        angle: 0,
        opacity: 0,
        active: false,
      });
    }

    // Create a shooting star
    const createShootingStar = () => {
      const inactiveStar = shootingStars.find(s => !s.active);
      if (!inactiveStar) return;

      inactiveStar.x = Math.random() * canvas.width * 0.7;
      inactiveStar.y = Math.random() * canvas.height * 0.3;
      inactiveStar.length = Math.random() * 100 + 50;
      inactiveStar.speed = Math.random() * 15 + 10;
      inactiveStar.angle = Math.PI / 4 + (Math.random() * 0.3 - 0.15);
      inactiveStar.opacity = 1;
      inactiveStar.active = true;
    };

    // Randomly trigger shooting stars
    const shootingStarInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        createShootingStar();
      }
    }, 3000);

    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw regular stars with twinkling
      stars.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 60 + star.twinklePhase);
        const currentOpacity = star.opacity + twinkle * 0.2;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentOpacity));
        ctx.fill();

        // Add glow for larger stars
        if (star.size > 2) {
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 3
          );
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, 'transparent');
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.globalAlpha = currentOpacity * 0.3;
          ctx.fill();
        }
      });

      // Draw shooting stars
      shootingStars.forEach(star => {
        if (!star.active) return;

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        
        const endX = star.x - Math.cos(star.angle) * star.length;
        const endY = star.y - Math.sin(star.angle) * star.length;
        
        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineTo(endX, endY);
        ctx.globalAlpha = 1;
        ctx.stroke();

        // Move shooting star
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.opacity -= 0.015;

        // Deactivate if off screen or faded
        if (star.opacity <= 0 || star.x > canvas.width || star.y > canvas.height) {
          star.active = false;
        }
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      clearInterval(shootingStarInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default EnhancedStarField;
