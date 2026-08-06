import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, BellRing, Headphones, Target, Volume2, Trash2, ShieldCheck } from 'lucide-react';
import {
  getNotifSettings,
  saveNotifSettings,
  notificationsSupported,
  requestNotificationPermission,
  showNotification,
  type NotifSettings,
} from '@/lib/notifications';

const Row = ({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  children: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/40 bg-card/50 backdrop-blur p-4">
    <div className="flex items-start gap-3 min-w-0">
      <Icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

const Switch = ({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) => (
  <button
    role="switch"
    aria-checked={on}
    aria-label={label}
    onClick={onClick}
    className={`w-12 h-7 rounded-full border transition-colors relative ${
      on ? 'bg-primary/30 border-primary/50' : 'bg-muted/40 border-border'
    }`}
  >
    <span
      className={`absolute top-1 w-5 h-5 rounded-full transition-all ${
        on ? 'left-6 bg-primary' : 'left-1 bg-muted-foreground'
      }`}
    />
  </button>
);

const Settings = () => {
  const [s, setS] = useState<NotifSettings>(getNotifSettings);
  const [msg, setMsg] = useState<string | null>(null);
  const [perm, setPerm] = useState<NotificationPermission | 'unsupported'>(
    notificationsSupported() ? Notification.permission : 'unsupported',
  );

  useEffect(() => {
    document.title = 'App Settings | Stellar Learning Lab';
  }, []);

  const update = (patch: Partial<NotifSettings>) => {
    const next = { ...s, ...patch };
    setS(next);
    saveNotifSettings(next);
  };

  const toggleMaster = async () => {
    if (s.enabled) {
      update({ enabled: false });
      setMsg('All reminders are off.');
      return;
    }
    if (!notificationsSupported()) {
      setMsg('This device does not support notifications.');
      return;
    }
    const p = await requestNotificationPermission();
    setPerm(p);
    if (p === 'granted') {
      update({ enabled: true });
      setMsg('Reminders on — we will nudge you for lectures and daily missions.');
      showNotification('Stellar Learning Lab', 'Notifications enabled! 🚀');
    } else {
      setMsg('Permission denied. Enable notifications in your browser or phone settings.');
    }
  };

  const clearProgressCache = () => {
    ['stellar_notif_last_fired'].forEach((k) => localStorage.removeItem(k));
    setMsg('Reminder history cleared — today’s alerts can fire again.');
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 rounded-xl border border-border/40 bg-card/50 text-foreground" aria-label="Back to home">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-display font-bold text-foreground">App Settings</h1>
        </div>

        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Notifications</h2>

          <Row
            icon={s.enabled ? BellRing : Bell}
            title="Push reminders"
            desc={
              perm === 'unsupported'
                ? 'Not supported on this device'
                : perm === 'denied'
                ? 'Blocked — allow notifications in device settings'
                : 'Master switch for all alerts'
            }
          >
            <Switch on={s.enabled} onClick={toggleMaster} label="Enable notifications" />
          </Row>

          <Row icon={Headphones} title="Study reminders" desc="Daily nudge to continue your learning">
            <Switch on={s.lectures} onClick={() => update({ lectures: !s.lectures })} label="Study reminders" />
          </Row>

          <Row icon={Target} title="Daily mission alerts" desc="Reminder to finish missions and keep your streak">
            <Switch on={s.missions} onClick={() => update({ missions: !s.missions })} label="Mission reminders" />
          </Row>

          <div className="grid grid-cols-2 gap-3">
            <label className="rounded-2xl border border-border/40 bg-card/50 p-4 block">
              <span className="text-xs text-muted-foreground">Study time</span>
              <input
                type="time"
                value={s.lectureTime}
                onChange={(e) => update({ lectureTime: e.target.value })}
                className="mt-2 w-full bg-transparent text-foreground text-lg font-semibold outline-none"
              />
            </label>
            <label className="rounded-2xl border border-border/40 bg-card/50 p-4 block">
              <span className="text-xs text-muted-foreground">Mission time</span>
              <input
                type="time"
                value={s.missionTime}
                onChange={(e) => update({ missionTime: e.target.value })}
                className="mt-2 w-full bg-transparent text-foreground text-lg font-semibold outline-none"
              />
            </label>
          </div>

          <Row icon={Volume2} title="Test alert" desc="Send a sample notification right now">
            <button
              onClick={() => {
                if (perm !== 'granted') {
                  setMsg('Turn on push reminders first.');
                  return;
                }
                showNotification('Test reminder 🎧', 'This is how your reminders will look.');
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold border border-primary/40 bg-primary/10 text-primary"
            >
              Send test
            </button>
          </Row>

          <Row icon={Trash2} title="Reset today’s reminders" desc="Lets today’s alerts fire again">
            <button
              onClick={clearProgressCache}
              className="px-3 py-2 rounded-xl text-xs font-semibold border border-border/60 bg-card/60 text-foreground"
            >
              Reset
            </button>
          </Row>

          {msg && <p className="text-xs text-muted-foreground px-1">{msg}</p>}
        </section>

        <section className="rounded-2xl border border-border/40 bg-card/50 p-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Reminders are generated on your device only — nothing is shared. They arrive while the app is open or
            installed in the background on supported devices.
          </p>
        </section>
      </div>
    </main>
  );
};

export default Settings;
