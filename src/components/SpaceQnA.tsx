import { useState, useRef } from 'react';
import { Search, Sparkles, Rocket, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages } from '@/data/translations';

const SPACE_QNA_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/space-qna`;

const suggestedQuestions = [
  "Why is the sky blue?",
  "How far is the Moon?",
  "What is a black hole?",
  "How do rockets work?",
  "What if the Sun disappeared?",
  "What courses are available?",
  "Which games can I play?",
  "Why is Venus the hottest planet?"
];

const getLanguageName = (code: string) => languages.find((lang) => lang.code === code)?.name ?? 'English';

const SpaceQnA = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [askedQuestion, setAskedQuestion] = useState('');
  const abortRef = useRef<AbortController | null>(null);
  const { t, language } = useLanguage();

  const handleSearch = async (searchQuery?: string) => {
    const queryToSearch = searchQuery || question;
    if (!queryToSearch.trim()) return;

    // Abort previous request
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsSearching(true);
    setAskedQuestion(queryToSearch);
    setAnswer('');
    setQuestion('');

    const maxRetries = 3;
    let attempt = 0;

    while (attempt < maxRetries) {
      try {
        const resp = await fetch(SPACE_QNA_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ question: queryToSearch, language, targetLanguageName: getLanguageName(language) }),
          signal: controller.signal,
        });

        if (resp.status === 429) {
          attempt++;
          if (attempt >= maxRetries) {
            setAnswer("Too many requests right now — please wait a few seconds and try again! 🚀");
            setIsSearching(false);
            return;
          }
          await new Promise(r => setTimeout(r, 2000 * attempt));
          continue;
        }

        if (!resp.ok) {
          const err = await resp.json().catch(() => ({}));
          setAnswer(err.error || "Something went wrong. Try again! 🔧");
          setIsSearching(false);
          return;
        }

        if (!resp.body) {
          setAnswer("No response received. Try again! 🔧");
          setIsSearching(false);
          return;
        }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIndex);
          buffer = buffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              setAnswer(fullText);
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // Flush remaining
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw || raw.startsWith(":") || !raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullText += content;
              setAnswer(fullText);
            }
          } catch { /* ignore */ }
        }
      }

      if (!fullText) setAnswer("Hmm, I couldn't find an answer. Try rephrasing your question! 🤔");
        break; // success — exit retry loop
      } catch (e: any) {
        if (e.name === 'AbortError') break;
        attempt++;
        if (attempt >= maxRetries) {
          console.error("Space Q&A error:", e);
          setAnswer("Something went wrong. Please try again! 🔧");
        } else {
          await new Promise(r => setTimeout(r, 2000 * attempt));
        }
      }
    }

    setIsSearching(false);
  };

  const handleSuggestedClick = (q: string) => {
    setQuestion(q);
    handleSearch(q);
  };

  return (
    <section id="space-qna" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="w-10 h-10 text-primary" />
            {t('section.spaceQnA')}
            <Sparkles className="w-10 h-10 text-yellow-400" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('section.spaceQnADesc')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
              <Input
                type="text"
                placeholder={t('qna.askAnything')}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-12 pr-4 py-6 text-lg bg-card/30 border-primary/30 text-foreground placeholder:text-muted-foreground/50 rounded-xl focus:border-primary focus:ring-primary/20"
              />
            </div>
            <Button
              onClick={() => handleSearch()}
              disabled={!question.trim() || isSearching}
              className="px-8 py-6 font-bold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSearching ? (
                <Rocket className="w-6 h-6 animate-bounce" />
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                   {t('qna.ask')}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Suggested Questions */}
        {!answer && !isSearching && (
          <div className="mb-8">
            <p className="text-muted-foreground text-sm mb-3 text-center">✨ {t('qna.suggested')}:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestedClick(q)}
                  className="px-4 py-2 text-sm bg-card/30 hover:bg-card/50 text-muted-foreground rounded-full border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Answer Area */}
        <div className={`transition-all duration-500 ${answer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {answer && (
            <div className="bg-card/20 border border-primary/30 rounded-2xl p-8 backdrop-blur-sm">
              {/* Question Display */}
              <div className="mb-6">
                <p className="text-sm text-primary font-medium mb-1">Your Question:</p>
                <p className="text-lg text-foreground font-semibold">{askedQuestion}</p>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6" />

              {/* Answer Display */}
              <div>
                <p className="text-sm text-primary/80 font-medium mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Answer:
                </p>
                <p className="text-xl text-foreground leading-relaxed whitespace-pre-wrap">
                  {answer}
                  {isSearching && <span className="inline-block w-2 h-5 bg-primary/70 animate-pulse ml-1 align-middle" />}
                </p>
              </div>

              {/* Ask Another Button */}
              {!isSearching && (
                <div className="mt-8 text-center">
                  <Button
                    onClick={() => {
                      setAnswer(null);
                      setAskedQuestion('');
                    }}
                    variant="outline"
                    className="border-primary/50 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  >
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Ask Another Question
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Empty State */}
        {!answer && !isSearching && (
          <div className="text-center py-12 opacity-60">
            <div className="text-6xl mb-4">🔭</div>
            <p className="text-muted-foreground">Your AI-powered answer will appear here!</p>
          </div>
        )}

        {/* Loading State */}
        {isSearching && !answer && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-bounce">🚀</div>
            <p className="text-muted-foreground animate-pulse">AI is searching the cosmos for your answer...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpaceQnA;
