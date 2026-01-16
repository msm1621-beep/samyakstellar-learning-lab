import { useRef } from 'react';
import { Award, Download, Star, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Book } from '@/data/books';

interface CompletionCertificateProps {
  book: Book;
  completedDate: string;
  onClose: () => void;
}

const CompletionCertificate = ({ book, completedDate, onClose }: CompletionCertificateProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = certificateRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Space Explorer Certificate</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Georgia', serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #0f0f23;
              padding: 20px;
            }
            .certificate {
              width: 800px;
              height: 600px;
              background: linear-gradient(135deg, #1a1a3e 0%, #0f0f23 50%, #1a1a3e 100%);
              border: 8px solid #ffd700;
              border-radius: 20px;
              padding: 40px;
              position: relative;
              overflow: hidden;
              color: white;
            }
            .certificate::before {
              content: '';
              position: absolute;
              inset: 15px;
              border: 3px solid rgba(255, 215, 0, 0.3);
              border-radius: 12px;
              pointer-events: none;
            }
            .stars {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              opacity: 0.3;
            }
            .star {
              position: absolute;
              width: 4px;
              height: 4px;
              background: white;
              border-radius: 50%;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              position: relative;
              z-index: 1;
            }
            .header h1 {
              font-size: 42px;
              color: #ffd700;
              text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
              margin-bottom: 5px;
              letter-spacing: 3px;
            }
            .header p {
              font-size: 18px;
              color: #a8a8d8;
              letter-spacing: 2px;
            }
            .content {
              text-align: center;
              position: relative;
              z-index: 1;
            }
            .award-icon {
              font-size: 60px;
              margin-bottom: 15px;
            }
            .presented-to {
              font-size: 16px;
              color: #a8a8d8;
              margin-bottom: 10px;
            }
            .name-line {
              font-size: 36px;
              color: #ffd700;
              font-style: italic;
              border-bottom: 2px solid rgba(255, 215, 0, 0.5);
              display: inline-block;
              padding: 0 40px 5px;
              margin-bottom: 20px;
            }
            .achievement {
              font-size: 18px;
              color: white;
              margin-bottom: 15px;
              line-height: 1.6;
            }
            .book-title {
              font-size: 24px;
              color: #9f7aea;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .type-badge {
              display: inline-block;
              background: linear-gradient(135deg, #9f7aea, #ed64a6);
              padding: 5px 20px;
              border-radius: 20px;
              font-size: 14px;
              margin-bottom: 25px;
            }
            .footer {
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              position: relative;
              z-index: 1;
              margin-top: 30px;
            }
            .date {
              color: #a8a8d8;
              font-size: 14px;
            }
            .signature {
              text-align: right;
            }
            .signature-line {
              border-top: 2px solid rgba(255, 215, 0, 0.5);
              width: 150px;
              margin-bottom: 5px;
            }
            .signature-text {
              font-size: 12px;
              color: #a8a8d8;
            }
            .rocket-icon {
              font-size: 30px;
            }
            @media print {
              body { background: white; }
              .certificate { 
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="stars">
              ${Array.from({ length: 50 }, () => {
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                return `<div class="star" style="left: ${x}%; top: ${y}%;"></div>`;
              }).join('')}
            </div>
            <div class="header">
              <h1>🏆 CERTIFICATE 🏆</h1>
              <p>OF SPACE EXPLORATION ACHIEVEMENT</p>
            </div>
            <div class="content">
              <div class="award-icon">🚀⭐🌟⭐🚀</div>
              <p class="presented-to">This certificate is proudly presented to</p>
              <div class="name-line">Space Explorer</div>
              <p class="achievement">For successfully completing the ${book.type === 'audiobook' ? 'audiobook' : 'book'}</p>
              <p class="book-title">"${book.title}"</p>
              <div class="type-badge">${book.type === 'audiobook' ? '🎧 Audiobook Listener' : '📚 Book Reader'}</div>
            </div>
            <div class="footer">
              <div class="date">
                <p>Completed on: ${completedDate}</p>
                <p>By: ${book.author}</p>
              </div>
              <div class="signature">
                <div class="signature-line"></div>
                <p class="signature-text">Stellar Learning Lab</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="max-w-3xl w-full animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Certificate Preview */}
        <div 
          ref={certificateRef}
          className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--background)) 50%, hsl(var(--card)) 100%)',
            border: '6px solid hsl(45, 100%, 50%)',
          }}
        >
          {/* Decorative inner border */}
          <div className="absolute inset-4 border-2 border-yellow-500/30 rounded-xl pointer-events-none" />
          
          {/* Stars background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <Star 
                key={i}
                className="absolute text-yellow-300/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${8 + Math.random() * 12}px`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>

          {/* Header */}
          <div className="text-center mb-6 relative z-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="w-10 h-10 text-yellow-400" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-yellow-400 tracking-wider">
                CERTIFICATE
              </h2>
              <Award className="w-10 h-10 text-yellow-400" />
            </div>
            <p className="text-muted-foreground tracking-widest text-sm uppercase">
              of Space Exploration Achievement
            </p>
          </div>

          {/* Content */}
          <div className="text-center relative z-10 py-4">
            <div className="flex items-center justify-center gap-2 text-4xl mb-4">
              <Rocket className="w-8 h-8 text-purple-400" />
              <span>⭐</span>
              <span>🌟</span>
              <span>⭐</span>
              <Rocket className="w-8 h-8 text-purple-400 scale-x-[-1]" />
            </div>

            <p className="text-muted-foreground mb-2">This certificate is proudly presented to</p>
            
            <div className="inline-block border-b-2 border-yellow-500/50 px-8 py-1 mb-4">
              <span className="text-2xl md:text-3xl font-display text-yellow-400 italic">
                Space Explorer
              </span>
            </div>

            <p className="text-foreground mb-3">
              For successfully completing the {book.type === 'audiobook' ? 'audiobook' : 'book'}
            </p>
            
            <p className="text-xl md:text-2xl font-display font-bold text-purple-400 mb-4">
              "{book.title}"
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
              {book.type === 'audiobook' ? (
                <>🎧 Audiobook Listener</>
              ) : (
                <>📚 Book Reader</>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end mt-8 relative z-10">
            <div className="text-sm text-muted-foreground">
              <p>Completed: {completedDate}</p>
              <p>Author: {book.author}</p>
            </div>
            <div className="text-right">
              <div className="w-32 border-t-2 border-yellow-500/50 mb-1" />
              <p className="text-xs text-muted-foreground">Stellar Learning Lab</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={handlePrint}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Print Certificate
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletionCertificate;
