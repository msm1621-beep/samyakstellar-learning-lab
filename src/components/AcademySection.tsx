import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Play, Pause, CheckCircle2, Sparkles, ArrowLeft, Users, Clock, BadgeCheck, Star, Languages } from 'lucide-react';
import { faculty, moneyCourses, VOICES, hinglishLine, lectureTeacher, type MoneyCourse } from '@/data/faculty';
import { isFavorite, toggleFavorite } from '@/lib/favorites';
import CourseQuiz from '@/components/CourseQuiz';

const STORE_KEY = 'academy_completed_lectures';

const loadDone = (): string[] => {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); } catch { return []; }
};

const AcademySection = () => {
  const [done, setDone] = useState<string[]>(loadDone);
  const [active, setActive] = useState<MoneyCourse | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [favTick, setFavTick] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [quizLecture, setQuizLecture] = useState<{ id: string; title: string } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(done));
  }, [done]);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const teacherOf = (id: number) => faculty.find(f => f.id === id) ?? faculty[0];

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    setPlaying(null);
    setElapsed(0);
    elapsedRef.current = 0;
  };

  const durationSeconds = (duration: string) => {
    const hours = Number(duration.match(/(\d+)h/)?.[1] || 0);
    const minutes = Number(duration.match(/(\d+)\s*m/)?.[1] || 0);
    return Math.max(30 * 60, hours * 3600 + minutes * 60);
  };

  const play = async (lectureId: string, duration: string, startVoice: number) => {
    setError(null);
    if (playing === lectureId) { stop(); return; }
    stop();
    const voiceList = Object.values(VOICES);
    const target = durationSeconds(duration);
    const a = new Audio();
    a.crossOrigin = 'anonymous';
    a.preload = 'auto';
    let chapter = startVoice % voiceList.length;
    a.src = voiceList[chapter].url;
    audioRef.current = a;
    a.ontimeupdate = () => {
      const total = Math.min(target, Math.floor(elapsedRef.current + a.currentTime));
      setElapsed(total);
    };
    a.onended = () => {
      elapsedRef.current += Number.isFinite(a.duration) ? a.duration : 0;
      if (elapsedRef.current >= target) {
        setPlaying(null);
        setElapsed(target);
        setDone(prev => (prev.includes(lectureId) ? prev : [...prev, lectureId]));
        const lecture = active?.lectures.find(item => item.id === lectureId);
        if (lecture) setQuizLecture({ id: lecture.id, title: lecture.title });
        return;
      }
      chapter = (chapter + 1) % voiceList.length;
      a.src = voiceList[chapter].url;
      void a.play();
    };
    a.onerror = () => {
      setPlaying(null);
      setError('Lecture audio could not load. Check your connection and try again.');
    };
    try {
      await a.play();
      setPlaying(lectureId);
    } catch {
      setPlaying(null);
      setError('Tap the play button once more — your browser blocked autoplay.');
    }
  };

  const progressOf = (c: MoneyCourse) =>
    Math.round((c.lectures.filter(l => done.includes(l.id)).length / c.lectures.length) * 100);

  const totalLectures = useMemo(() => moneyCourses.reduce((n, c) => n + c.lectures.length, 0), []);

  if (active) {
    const courseIndex = moneyCourses.findIndex(c => c.id === active.id);
    const lead = teacherOf(active.facultyId);
    const pct = progressOf(active);
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => { stop(); setActive(null); }}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> All premium courses
        </button>

        <div className={`rounded-2xl p-6 bg-gradient-to-br ${active.gradient} shadow-xl`}>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2 py-1 rounded-full bg-black/30 text-white text-xs font-semibold">{active.level}</span>
            <span className="px-2 py-1 rounded-full bg-black/30 text-white text-xs">{active.weeks} weeks</span>
            <span className="px-2 py-1 rounded-full bg-black/30 text-white text-xs flex items-center gap-1">
              <Languages className="w-3 h-3" /> Hinglish
            </span>
            <span className="px-2 py-1 rounded-full bg-white/90 text-slate-900 text-xs font-bold">
              <s className="opacity-60 mr-1">{active.originalPrice}</s> FREE
            </span>
          </div>
          <h3 className="text-2xl font-display font-bold text-white">{active.title}</h3>
          <p className="text-white/85 mt-1">{active.tagline}</p>
        </div>

        <div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-white font-bold">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold flex items-center gap-1">
                {lead.name} <BadgeCheck className="w-4 h-4 text-cyan-300" />
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">COURSE LEAD</span>
              </p>
              <p className="text-white/60 text-sm">{lead.role} · Har lecture alag teacher padhate hain</p>
            </div>
            <button
              onClick={() => { toggleFavorite({ id: active.id, kind: 'course', title: active.title, meta: active.tagline }); setFavTick(t => t + 1); }}
              className="ml-auto p-2 rounded-lg border border-white/15 hover:bg-white/10"
              aria-label="Add course to favorites"
            >
              <Star className={`w-4 h-4 ${isFavorite(active.id) ? 'fill-amber-300 text-amber-300' : 'text-white/60'}`} key={favTick} />
            </button>
          </div>
          <ul className="mt-4 grid sm:grid-cols-2 gap-2">
            {active.outcomes.map(o => (
              <li key={o} className="text-white/75 text-sm flex gap-2"><Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />{o}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-semibold">Recorded lectures (Hinglish)</h4>
            <span className="text-white/60 text-sm">{pct}% complete</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-4">
            <div className={`h-full bg-gradient-to-r ${active.gradient}`} style={{ width: `${pct}%` }} />
          </div>

          {error && (
            <p className="mb-3 text-xs text-amber-200 bg-amber-500/10 border border-amber-400/30 rounded-lg p-2">{error}</p>
          )}

          <div className="space-y-2">
            {active.lectures.map((l, i) => {
              const isDone = done.includes(l.id);
              const isPlaying = playing === l.id;
              const teacher = lectureTeacher(courseIndex, i);
              const voice = VOICES[teacher.voice];
              return (
                <div key={l.id} className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-start gap-3">
                  <button
                     onClick={() => play(l.id, l.duration, courseIndex * 7 + i * 3)}
                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br ${active.gradient} text-white`}
                    aria-label={isPlaying ? `Pause ${l.title}` : `Play ${l.title}`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm font-medium">{i + 1}. {l.title}</p>
                    <p className="text-white/70 text-xs mt-0.5">{hinglishLine(l.title)}</p>
                    <p className="text-white/50 text-xs mt-1">{l.summary}</p>
                    <p className="text-white/40 text-[11px] mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{l.duration}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{teacher.name} · {voice.name}</span>
                    </p>
                    {isPlaying && (
                      <div className="mt-2">
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div className={`h-full bg-gradient-to-r ${active.gradient}`} style={{ width: `${Math.min(100, (elapsed / durationSeconds(l.duration)) * 100)}%` }} />
                        </div>
                        <p className="mt-1 text-[10px] text-white/45">Long-form chapter playback · {Math.floor(elapsed / 60)} min completed</p>
                      </div>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    {isDone && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    {isDone && <button onClick={() => setQuizLecture({ id: l.id, title: l.title })} className="rounded-md border border-cyan-400/30 px-2 py-1 text-[10px] text-cyan-200 hover:bg-cyan-500/10">Quiz</button>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-white font-semibold mb-3">More teachers you can learn from</h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {faculty.slice(0, 20).map(f => (
              <div key={f.id} className="shrink-0 w-40 rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-white text-sm font-medium truncate">{f.name}</p>
                <p className="text-white/55 text-xs truncate">{f.role}</p>
              </div>
            ))}
          </div>
        </div>
        {quizLecture && <CourseQuiz courseId={quizLecture.id} courseTitle={`${quizLecture.title} Quiz`} onClose={() => setQuizLecture(null)} />}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-200 text-xs mb-3">
          <GraduationCap className="w-4 h-4" /> All premium courses unlocked — no payment needed
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-bold text-white">Premium Academy</h3>
        <p className="text-white/65 mt-2 text-sm max-w-2xl mx-auto">
          {moneyCourses.length} paid-tier courses taught by {faculty.length} faculty members through {totalLectures} recorded Hinglish audio lectures — free for every Stellar Learning Lab student.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {moneyCourses.map((c, i) => {
          const t = teacherOf(c.facultyId);
          const pct = progressOf(c);
          return (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setActive(c)}
              className="text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden"
            >
              <div className={`h-24 bg-gradient-to-br ${c.gradient} p-3 flex items-start justify-between`}>
                <span className="px-2 py-1 rounded-full bg-black/30 text-white text-[11px]">{c.level}</span>
                <span className="px-2 py-1 rounded-full bg-white/90 text-slate-900 text-[11px] font-bold">
                  <s className="opacity-60 mr-1">{c.originalPrice}</s> FREE
                </span>
              </div>
              <div className="p-4">
                <h4 className="text-white font-semibold leading-tight">{c.title}</h4>
                <p className="text-white/60 text-xs mt-1 line-clamp-2">{c.tagline}</p>
                <p className="text-white/50 text-xs mt-2 flex items-center gap-1"><Users className="w-3 h-3" />{t.name} · course lead</p>
                <p className="text-white/40 text-[11px] mt-1">{c.lectures.length} Hinglish lectures · {c.weeks} weeks</p>
                {pct > 0 && (
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mt-3">
                    <div className={`h-full bg-gradient-to-r ${c.gradient}`} style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-10">
        <h4 className="text-white font-semibold mb-3">Our Faculty ({faculty.length} experts, {Object.keys(VOICES).length} voices)</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {faculty.map(f => (
            <div key={f.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 flex items-center justify-center text-white text-[11px] font-bold">
                  {f.name.split(' ').map(n => n[0]).join('')}
                </div>
                <p className="text-white text-xs font-medium truncate">{f.name}</p>
              </div>
              <p className="text-white/55 text-[11px] mt-1.5 truncate">{f.role}</p>
              <p className="text-white/35 text-[10px] mt-1 truncate">{VOICES[f.voice].name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademySection;
