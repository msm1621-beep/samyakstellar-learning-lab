import { useCallback, useEffect, useState } from 'react';
import { Bell, X, Trash2, CheckCheck, BellOff, Newspaper, Rocket } from 'lucide-react';
import {
  getInbox,
  markInboxRead,
  removeInboxItem,
  clearInbox,
  INBOX_EVENT,
  type InboxItem,
} from '@/lib/notifications';

const timeAgo = (ts: number) => {
  const diff = Math.max(0, Date.now() - ts);
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return d === 1 ? 'yesterday' : `${d}d ago`;
};

const NotificationInbox = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<InboxItem[]>([]);

  const refresh = useCallback(() => setItems(getInbox()), []);

  useEffect(() => {
    refresh();
    const onChange = () => refresh();
    window.addEventListener(INBOX_EVENT, onChange);
    window.addEventListener('storage', onChange);
    const poll = window.setInterval(refresh, 15000);
    return () => {
      window.removeEventListener(INBOX_EVENT, onChange);
      window.removeEventListener('storage', onChange);
      window.clearInterval(poll);
    };
  }, [refresh]);

  const unread = items.filter((i) => !i.read).length;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Notification inbox${unread ? `, ${unread} unread` : ''}`}
        className="fixed top-[4.5rem] right-4 z-40 w-11 h-11 rounded-full glass-card border border-border/50 flex items-center justify-center text-foreground hover:border-primary/60 transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-start justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="glass-card w-full max-w-md rounded-2xl mt-16 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-display font-bold text-foreground">Notification inbox</h2>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => markInboxRead()}
                  disabled={!unread}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-40"
                  aria-label="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
                <button
                  onClick={clearInbox}
                  disabled={!items.length}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-40"
                  aria-label="Clear inbox"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground"
                  aria-label="Close inbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto divide-y divide-border/30">
              {items.length === 0 && (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  <BellOff className="w-6 h-6 mx-auto mb-2 opacity-60" />
                  No reminders yet. Turn on reminders in Settings — they will appear here even if your device blocks
                  notifications.
                </div>
              )}
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`px-4 py-3 flex items-start gap-3 ${item.read ? 'opacity-70' : 'bg-primary/5'}`}
                  onClick={() => !item.read && markInboxRead(item.id)}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 whitespace-pre-wrap">{item.body}</p>
                    <p className="text-[11px] text-muted-foreground/70 mt-1">
                      {timeAgo(item.at)}
                      {!item.delivered && ' • shown in app only'}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeInboxItem(item.id);
                    }}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground"
                    aria-label="Delete notification"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationInbox;
