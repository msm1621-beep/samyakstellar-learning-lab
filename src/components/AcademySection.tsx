import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Play, Pause, CheckCircle2, Sparkles, ArrowLeft, Users, Clock, BadgeCheck } from 'lucide-react';
import { faculty, moneyCourses, VOICES, type MoneyCourse } from '@/data/faculty';

const STORE_KEY = 'academy_completed_lectures';

const loadDone = (): string[] => {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '[]'); } catch { return []; }
};

const AcademySection = () => {
  const [done, setDone] = useState<string[]>(loadDone);
  const [active, setActive] = useState<MoneyCourse | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(done));
  }, [done]);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const teacherOf = (id: number) => faculty.find(f => f.id === id)!;

  const play = (lectureId: string, url: string) => {
    if (playing === lectureId) {
      audioRef.current?.pause();
      setPlaying(null);
      return;
    }
    audioRef.current?.pause();
    const a = new Audio(url);
    audioRef.current = a;
    a.onended = () => {
      setPlaying(null);
      setDone(prev => (prev.includes(lectureId) ? prev : [...prev, lectureId]));
    };
    a.play().catch(() => setPlaying(null));
    setPlaying(lectureId);
  };

  const progressOf = (c: MoneyCourse) =>
    Math.round((c.lectures.filter(l => done.includes(l.id)).length / c.lectures.length) * 100);

  const totalLectures = useMemo(() => moneyCourses.reduce((n, c) => n + c.lectures.length, 0), []);

  if (active) {
    const t = teacherOf(active.facultyId);
    const voice = VOICES[t.voice];
    const pct = progressOf(active);
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button onClick={() => { audioRef.current?.pause(); setPlaying(null); setActive(null); }}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> All premium courses
        </button>

        <div className={`rounded-2xl p-6 bg-gradient-to-br ${active.gradient} shadow-xl`}>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2 py-1 rounded-full bg-black/30 text-white text-xs font-semibold">{active.level}</span>
            <span className="px-2 py-1 rounded-full bg-black/30 text-white text-xs">{active.weeks} weeks</span>
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
              {t.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold flex items-center gap-1">
                {t.name} <BadgeCheck className="w-4 h-4 text-cyan-300" />
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-200 border border-cyan-400/30">AI FACULTY</span>
              </p>
              <p className="text-white/60 text-sm">{t.role} · Voice: {voice.name}</p>
            </div>
          </div>
          <ul className="mt-4 grid sm:grid-cols-2 gap-2">
            {active.outcomes.map(o => (
              <li key={o} className="text-white/75 text-sm flex gap-2"><Sparkles className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />{o}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-white font-semibold">Recorded lectures</h4>
            <span className="text-white/60 text-sm">{pct}% complete</span>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-4">
            <div className={`h-full bg-gradient-to-r ${active.gradient}`} style={{ width: `${pct}%` }} />
          </div>

          <div className="space-y-2">
            {active.lectures.map((l, i) => {
              const isDone = done.includes(l.id);
              const isPlaying = playing === l.id;
              return (
                <div key={l.id} className="rounded-xl border border-white/10 bg-white/5 p-3 flex items-start gap-3">
                  <button
                    onClick={() => play(l.id, voice.url)}
                    className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br ${active.gradient} text-white`}
                    aria-label={isPlaying ? `Pause ${l.title}` : `Play ${l.title}`}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm font-medium">{i + 1}. {l.title}</p>
                    <p className="text-white/60 text-xs mt-0.5">{l.summary}</p>
                    <p className="text-white/40 text-[11px] mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{l.duration}</p>
                  </div>
                  {isDone && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-white font-semibold mb-3">More AI faculty you can learn from</h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {faculty.slice(0, 20).map(f => (
              <div key={f.id} className="shrink-0 w-40 rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-white text-sm font-medium truncate">{f.name}</p>
                <p className="text-white/55 text-xs truncate">{f.role}</p>
              </div>
            ))}
          </div>
        </div>
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
          {moneyCourses.length} paid-tier courses taught by {faculty.length} AI faculty members through {totalLectures} recorded audio lectures — free for every Stellar Learning Lab student.
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
                <p className="text-white/50 text-xs mt-2 flex items-center gap-1"><Users className="w-3 h-3" />{t.name} · AI faculty</p>
                <p className="text-white/40 text-[11px] mt-1">{c.lectures.length} recorded lectures · {c.weeks} weeks</p>
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
        <h4 className="text-white font-semibold mb-3">Our AI Faculty ({faculty.length} experts)</h4>
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
              <p className="text-white/35 text-[10px] mt-1 truncate">{f.topics.slice(0, 2).join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcademySection;
