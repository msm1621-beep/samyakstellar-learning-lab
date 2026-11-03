import { useEffect, useState, useCallback } from 'react';
import { Newspaper, RefreshCw, ExternalLink, Clock, Radio } from 'lucide-react';
import {
  readCache,
  fetchSpaceNews,
  startNewsRefresh,
  NEWS_EVENT,
  timeAgoShort,
  type SpaceNewsItem,
} from '@/lib/spaceNews';

const SpaceNews = () => {
  const [items, setItems] = useState<SpaceNewsItem[]>(() => readCache()?.items ?? []);
  const [fetchedAt, setFetchedAt] = useState<number | null>(() => readCache()?.fetchedAt ?? null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (force = false) => {
    setLoading(true);
    const fresh = await fetchSpaceNews(force);
    setItems(fresh);
    setFetchedAt(readCache()?.fetchedAt ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    startNewsRefresh();
    void load();
    const onChange = () => {
      setItems(readCache()?.items ?? []);
      setFetchedAt(readCache()?.fetchedAt ?? null);
    };
    window.addEventListener(NEWS_EVENT, onChange);
    return () => window.removeEventListener(NEWS_EVENT, onChange);
  }, [load]);

  return (
    <section className="max-w-5xl mx-auto px-4 pb-14">
      <div className="glass-card rounded-3xl p-5 md:p-7 border border-border/40">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center shadow-lg shadow-black/30 ring-1 ring-white/20">
              <Newspaper className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-foreground">Latest Space News</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Radio className="w-3 h-3" />
                {fetchedAt ? `Updated ${timeAgoShort(new Date(fetchedAt).toISOString())}` : 'Fetching live headlines…'}
              </p>
            </div>
          </div>
          <button
            onClick={() => void load(true)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {items.length === 0 && !loading && (
          <p className="text-sm text-muted-foreground py-10 text-center">
            No headlines yet — tap Refresh to pull the latest space news from NASA, ESA and more.
          </p>
        )}

        {loading && items.length === 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-48 rounded-2xl bg-muted/20 animate-pulse" />
            ))}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl overflow-hidden border border-border/40 bg-card/60 backdrop-blur flex flex-col group hover:border-primary/50 transition-colors"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-40 object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-8" />
              )}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary font-semibold">{item.source}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {timeAgoShort(item.publishedAt)}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">{item.title}</h3>
                {item.summary && (
                  <p className="text-xs text-muted-foreground line-clamp-3 flex-1">{item.summary}</p>
                )}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline self-start"
                >
                  Read full story <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="text-[11px] text-muted-foreground mt-5">
          Headlines refresh automatically every few hours while the app is open. Turn on the "Latest space news" alert
          type in Settings to get notified when big stories land.
        </p>
      </div>
    </section>
  );
};

export default SpaceNews;
