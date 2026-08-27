import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircleQuestion, Send, X, Loader2, Bot, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface LessonDoubtChatProps {
  lessonTitle: string;
  lessonTopics: string[];
}

const LessonDoubtChat = ({ lessonTitle, lessonTopics }: LessonDoubtChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    // Clear previous error
    setError(null);
    
    const userMsg: Message = { role: 'user', content: input.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput('');
    setLoading(true);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('lesson-doubt', {
        body: {
          lessonTitle,
          lessonTopics,
          messages: allMessages.slice(-10),
        },
      });

      if (functionError) {
        throw functionError;
      }

      if (!data || !data.answer) {
        throw new Error('No response from server');
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get response';
      console.error('Doubt chat error:', err);
      setError(errorMessage);
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I couldn't process that right now. Please try again in a moment!" 
      }]);

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setIsOpen(true);
          setError(null);
        }}
        className="text-primary hover:bg-primary/10 gap-1"
      >
        <MessageCircleQuestion className="w-4 h-4" />
        Ask Doubt
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Bot className="w-5 h-5 text-primary" />
                    Doubt Chat
                  </h3>
                  <p className="text-xs text-muted-foreground truncate max-w-[300px]">{lessonTitle}</p>
                </div>
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setError(null);
                  }} 
                  className="p-2 rounded-full bg-muted/50 hover:bg-muted"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {error && (
                <div className="mx-4 mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-destructive">{error}</p>
                </div>
              )}

              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px]">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    <MessageCircleQuestion className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Ask any doubt about this lesson!</p>
                    <p className="text-xs mt-1 opacity-60">Topics: {lessonTopics.join(', ')}</p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-foreground'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-muted/50 rounded-xl px-4 py-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 border-t border-border/50">
                <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your doubt..."
                    className="flex-1 bg-muted/30 border-border"
                    disabled={loading}
                  />
                  <Button type="submit" size="icon" disabled={loading || !input.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LessonDoubtChat;
