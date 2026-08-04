// Local reminder notifications for lectures + daily missions.
// Uses the browser Notification API with in-app timers (no server push needed).

export interface NotifSettings {
  enabled: boolean;
  lectures: boolean;
  missions: boolean;
  lectureTime: string; // "HH:MM"
  missionTime: string; // "HH:MM"
  sound: boolean;
}

const KEY = 'stellar_notif_settings';
const MASTER_KEY = 'stellar_notifications_enabled'; // legacy key kept in sync
const LAST_FIRED_KEY = 'stellar_notif_last_fired';

export const DEFAULT_SETTINGS: NotifSettings = {
  enabled: false,
  lectures: true,
  missions: true,
  lectureTime: '18:00',
  missionTime: '09:00',
  sound: true,
};

export const getNotifSettings = (): NotifSettings => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (raw && typeof raw === 'object') return { ...DEFAULT_SETTINGS, ...raw };
  } catch {}
  const legacy = localStorage.getItem(MASTER_KEY) === 'true';
  return { ...DEFAULT_SETTINGS, enabled: legacy };
};

export const saveNotifSettings = (s: NotifSettings) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
    localStorage.setItem(MASTER_KEY, String(s.enabled));
  } catch {}
  window.dispatchEvent(new CustomEvent('notif-settings-changed'));
  startReminderScheduler();
};

export const notificationsSupported = () => typeof window !== 'undefined' && 'Notification' in window;

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!notificationsSupported()) return 'denied';
  if (Notification.permission === 'granted') return 'granted';
  return await Notification.requestPermission();
};

export const showNotification = (title: string, body: string) => {
  if (!notificationsSupported() || Notification.permission !== 'granted') return;
  try {
    const n = new Notification(title, { body, icon: '/icons/icon-192.png', badge: '/icons/icon-192.png' });
    n.onclick = () => {
      window.focus();
      n.close();
    };
  } catch {}
};

const todayKey = () => new Date().toISOString().slice(0, 10);

const readFired = (): Record<string, string> => {
  try {
    return JSON.parse(localStorage.getItem(LAST_FIRED_KEY) || '{}') || {};
  } catch {
    return {};
  }
};

const markFired = (id: string) => {
  const map = readFired();
  map[id] = todayKey();
  try {
    localStorage.setItem(LAST_FIRED_KEY, JSON.stringify(map));
  } catch {}
};

const dueNow = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  const target = (h || 0) * 60 + (m || 0);
  return mins >= target && mins - target < 120; // fires within a 2h window after target
};

const tick = () => {
  const s = getNotifSettings();
  if (!s.enabled || !notificationsSupported() || Notification.permission !== 'granted') return;
  const fired = readFired();
  const today = todayKey();

  if (s.missions && fired.missions !== today && dueNow(s.missionTime)) {
    markFired('missions');
    showNotification('Daily Missions ready 🚀', 'Aaj ke space missions complete karo aur streak bachao!');
  }
  if (s.lectures && fired.lectures !== today && dueNow(s.lectureTime)) {
    markFired('lectures');
    showNotification('Lecture reminder 🎧', 'Your Hinglish lecture is waiting in Premium Academy.');
  }
};

let timer: number | null = null;

export const startReminderScheduler = () => {
  if (typeof window === 'undefined') return;
  if (timer !== null) window.clearInterval(timer);
  tick();
  timer = window.setInterval(tick, 60_000);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') tick();
  });
};
