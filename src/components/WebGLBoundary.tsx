import { Component, ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

const WEBGL_FALLBACK = (
  <div className="w-full h-full min-h-[200px] flex items-center justify-center p-6 text-center">
    <div className="text-white/80 font-fredoka">
      🌌 3D view unavailable on this device.
      <br />
      <span className="text-sm text-white/50">
        Try a different browser or close other tabs to free GPU memory.
      </span>
    </div>
  </div>
);

let webGLUnavailable = false;

const canCreateWebGLContext = () => {
  if (webGLUnavailable || typeof document === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const options = { failIfMajorPerformanceCaveat: false, powerPreference: 'low-power' as WebGLPowerPreference };
    const gl =
      canvas.getContext('webgl2', options) ||
      canvas.getContext('webgl', options) ||
      canvas.getContext('experimental-webgl', options as WebGLContextAttributes);

    if (!gl) {
      webGLUnavailable = true;
      return false;
    }

    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    webGLUnavailable = true;
    return false;
  }
};

export const WebGLGuard = ({ children, fallback = WEBGL_FALLBACK }: Props) => {
  const [isReady, setIsReady] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    setIsAvailable(canCreateWebGLContext());
    setIsReady(true);
  }, []);

  if (!isReady || !isAvailable) return <>{fallback}</>;

  return <WebGLBoundary fallback={fallback}>{children}</WebGLBoundary>;
};

class WebGLBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    webGLUnavailable = true;
    console.warn('WebGL canvas failed to initialize:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? WEBGL_FALLBACK;
    }
    return this.props.children;
  }
}

export default WebGLBoundary;
