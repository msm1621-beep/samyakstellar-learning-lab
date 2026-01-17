import { Award, Star, Rocket, Sparkles, X, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Course } from '@/data/courses';
import { useRef } from 'react';

interface CourseCertificateProps {
  course: Course;
  completedDate: string;
  onClose: () => void;
}

const CourseCertificate = ({ course, completedDate, onClose }: CourseCertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const certificateHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Course Completion Certificate - ${course.title}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Georgia', serif;
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 20px;
            }
            .certificate {
              background: linear-gradient(145deg, #fefefe 0%, #f8f4e8 100%);
              border: 8px double #c9a227;
              border-radius: 12px;
              padding: 50px;
              max-width: 800px;
              text-align: center;
              position: relative;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .header { color: #1a1a2e; font-size: 16px; letter-spacing: 3px; margin-bottom: 10px; }
            .title { color: #c9a227; font-size: 42px; font-weight: bold; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); }
            .course-title { color: #0f3460; font-size: 28px; font-weight: bold; margin: 30px 0; padding: 15px; background: linear-gradient(90deg, transparent, rgba(201, 162, 39, 0.1), transparent); border-radius: 8px; }
            .description { color: #444; font-size: 16px; margin: 20px 0; line-height: 1.6; }
            .goals { text-align: left; margin: 25px auto; max-width: 500px; }
            .goals h4 { color: #0f3460; margin-bottom: 10px; }
            .goals li { color: #555; margin: 8px 0; font-size: 14px; }
            .date { color: #666; font-size: 14px; margin-top: 30px; }
            .stars { color: #c9a227; font-size: 30px; margin: 20px 0; }
            .seal { 
              position: absolute; 
              bottom: 30px; 
              right: 40px; 
              width: 80px; 
              height: 80px; 
              background: linear-gradient(135deg, #c9a227, #e8d48b);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #1a1a2e;
              font-weight: bold;
              font-size: 12px;
              box-shadow: 0 4px 15px rgba(201,162,39,0.4);
            }
            @media print {
              body { background: white; padding: 0; }
              .certificate { box-shadow: none; border-width: 4px; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">STELLAR LEARNING LAB</div>
            <div class="title">🎓 COURSE COMPLETED 🎓</div>
            <div class="stars">⭐ ⭐ ⭐ ⭐ ⭐</div>
            <div class="course-title">${course.title}</div>
            <div class="description">${course.description}</div>
            <div class="goals">
              <h4>🚀 Skills Mastered:</h4>
              <ul>
                ${course.learningGoals.map(goal => `<li>✓ ${goal}</li>`).join('')}
              </ul>
            </div>
            <div class="date">
              <strong>Completed on:</strong> ${completedDate}<br/>
              <strong>Difficulty:</strong> ${course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}<br/>
              <strong>Duration:</strong> ${course.estimatedDuration}
            </div>
            <div class="seal">CERTIFIED SPACE EXPLORER</div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(certificateHTML);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-space-deep via-space-nebula/20 to-space-deep border-2 border-space-gold/40 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white/70 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Certificate Preview */}
          <div ref={certificateRef} className="bg-gradient-to-br from-amber-50 to-yellow-50 border-4 border-double border-space-gold rounded-xl p-8 text-center">
            {/* Header */}
            <div className="flex justify-center gap-2 mb-2">
              <Star className="w-6 h-6 text-space-gold fill-space-gold" />
              <Sparkles className="w-6 h-6 text-space-gold" />
              <Star className="w-6 h-6 text-space-gold fill-space-gold" />
            </div>
            
            <p className="text-space-deep/70 text-sm tracking-widest mb-2">STELLAR LEARNING LAB</p>
            <h2 className="text-3xl font-bold text-space-gold mb-4">🎓 Course Completed! 🎓</h2>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-space-gold fill-space-gold" />
              ))}
            </div>

            {/* Course Info */}
            <div className="bg-gradient-to-r from-transparent via-space-gold/10 to-transparent py-4 px-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold text-space-deep mb-2">{course.title}</h3>
              <p className="text-space-deep/70 text-sm">{course.description}</p>
            </div>

            {/* Learning Goals */}
            <div className="text-left bg-white/50 rounded-lg p-4 mb-6">
              <h4 className="text-space-deep font-semibold mb-2 flex items-center gap-2">
                <Rocket className="w-4 h-4" /> Skills Mastered:
              </h4>
              <ul className="space-y-1">
                {course.learningGoals.map((goal, idx) => (
                  <li key={idx} className="text-space-deep/80 text-sm flex items-start gap-2">
                    <span className="text-green-600">✓</span> {goal}
                  </li>
                ))}
              </ul>
            </div>

            {/* Completion Info */}
            <div className="text-space-deep/80 text-sm space-y-1">
              <p><strong>Completed on:</strong> {completedDate}</p>
              <p><strong>Difficulty:</strong> {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}</p>
              <p><strong>Duration:</strong> {course.estimatedDuration}</p>
            </div>

            {/* Seal */}
            <div className="mt-6 flex justify-center">
              <div className="bg-gradient-to-br from-space-gold to-yellow-400 rounded-full p-4 shadow-lg">
                <Award className="w-10 h-10 text-space-deep" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={handlePrint}
              className="bg-gradient-to-r from-space-gold to-yellow-500 text-space-deep hover:from-yellow-400 hover:to-space-gold font-semibold"
            >
              <Printer className="w-4 h-4 mr-2" /> Print Certificate
            </Button>
            <Button variant="outline" onClick={onClose} className="border-white/30 text-white hover:bg-white/10">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCertificate;
