// Local reminder notifications for lectures + daily missions.
// Uses a notification-only service worker (required on Android Chrome) with a
// fallback to the classic Notification constructor on desktop browsers.

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
const SW_URL = '/notif-sw.js';

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

export const notificationsSupported = () =>
  typeof window !== 'undefined' && 'Notification' in window;

export const isInIframe = () => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
};

export const getPermission = (): NotificationPermission | 'unsupported' =>
  notificationsSupported() ? Notification.permission : 'unsupported';

let swReg: ServiceWorkerRegistration | null = null;

export const ensureNotifWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return null;
  if (swReg) return swReg;
  try {
    const existing = await navigator.serviceWorker.getRegistration(SW_URL);
    swReg = existing ?? (await navigator.serviceWorker.register(SW_URL, { scope: '/' }));
    await navigator.serviceWorker.ready.catch(() => undefined);
    return swReg;
  } catch {
    return null;
  }
};

export type EnableResult = {
  ok: boolean;
  permission: NotificationPermission | 'unsupported';
  reason?: string;
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!notificationsSupported()) return 'denied';
  if (Notification.permission === 'granted') return 'granted';
  try {
    return await Notification.requestPermission();
  } catch {
    return 'denied';
  }
};

export const enableNotifications = async (): Promise<EnableResult> => {
  if (!notificationsSupported()) {
    return {
      ok: false,
      permission: 'unsupported',
      reason: isInIframe()
        ? 'Notifications are blocked inside the preview frame. Open the app in its own browser tab (or install it) and try again.'
        : 'This browser does not support notifications.',
    };
  }
  const p = await requestNotificationPermission();
  if (p !== 'granted') {
    return {
      ok: false,
      permission: p,
      reason:
        p === 'denied'
          ? isInIframe()
            ? 'Blocked in the preview frame. Open the app in a real browser tab or install it, then allow notifications.'
            : 'Permission blocked. Allow notifications for this site in your browser/phone settings and retry.'
          : 'Permission request was dismissed. Tap again and choose Allow.',
    };
  }
  await ensureNotifWorker();
  return { ok: true, permission: 'granted' };
};

export const showNotification = async (title: string, body: string): Promise<boolean> => {
  if (!notificationsSupported() || Notification.permission !== 'granted') return false;
  const options: NotificationOptions = {
    body,
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-192.png',
    tag: 'stellar-reminder-' + title,
    data: { url: '/' },
  };
  // Preferred path (works on Android + desktop).
  const reg = await ensureNotifWorker();
  if (reg) {
    try {
      await reg.showNotification(title, options);
      return true;
    } catch {}
  }
  // Desktop fallback.
  try {
    const n = new Notification(title, options);
    n.onclick = () => {
      window.focus();
      n.close();
    };
    return true;
  } catch {
    return false;
  }
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
    void showNotification('Daily Missions ready 🚀', 'Aaj ke space missions complete karo aur streak bachao!');
  }
  if (s.lectures && fired.lectures !== today && dueNow(s.lectureTime)) {
    markFired('lectures');
    void showNotification('Study reminder 📚', 'Time to explore a new space topic in Stellar Learning Lab.');
  }
};

let timer: number | null = null;
let visibilityBound = false;

export const startReminderScheduler = () => {
  if (typeof window === 'undefined') return;
  if (timer !== null) window.clearInterval(timer);
  const settings = getNotifSettings();
  if (settings.enabled) void ensureNotifWorker();
  tick();
  timer = window.setInterval(tick, 60_000);
  if (!visibilityBound) {
    visibilityBound = true;
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') tick();
    });
  }
};
