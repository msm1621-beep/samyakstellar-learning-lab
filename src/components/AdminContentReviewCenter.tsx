'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Clock, Zap, ExternalLink, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getContentNeedingReview, getSyncStatus, getContentSources } from '@/lib/contentManagement';
import type { ContentReview } from '@/lib/contentManagement';

const AdminContentReviewCenter = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<ContentReview[]>([]);
  const [syncStatus, setSyncStatus] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'queue' | 'sync' | 'sources'>('queue');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [reviewsData, syncData] = await Promise.all([
        getContentNeedingReview(),
        getSyncStatus(),
      ]);
      setReviews(reviewsData);
      setSyncStatus(syncData);
    } catch (error) {
      toast({
        title: 'Error loading data',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const priorityColor = (p: string) => {
    switch (p) {
      case 'urgent':
        return 'text-destructive bg-destructive/10';
      case 'high':
        return 'text-orange-500 bg-orange-500/10';
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10';
      default:
        return 'text-muted-foreground bg-muted/30';
    }
  };

  const syncStatusIcon = (status: string) => {
    switch (status) {
      case 'synced':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'syncing':
        return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Zap className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Content Review Center 🔍</h1>
            <p className="text-muted-foreground mt-1">
              Manage information updates, verification, and synchronization across Stellar Learning Lab
            </p>
          </div>
          <Button onClick={loadData} variant="outline" size="sm">
            Refresh
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border/50">
          {[
            { id: 'queue', label: '📋 Review Queue', count: reviews.length },
            { id: 'sync', label: '🔄 Sync Status', count: syncStatus.length },
            { id: 'sources', label: '📚 Sources', count: 0 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label} {tab.count > 0 && <span className="ml-2 badge">{tab.count}</span>}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            <p className="text-muted-foreground mt-3">Loading...</p>
          </div>
        ) : activeTab === 'queue' ? (
          <div className="space-y-3">
            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-card/30 rounded-lg border border-border/50">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <p className="text-muted-foreground">All caught up! No items in review queue.</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-4 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityColor(review.priority)}`}>
                          {review.priority.toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                          {review.review_type.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground">{review.description}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{review.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Approve</Button>
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="p-1"><MoreVertical className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : activeTab === 'sync' ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {syncStatus.map((sync) => (
              <div key={sync.id} className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-foreground capitalize">{sync.target_type}</h3>
                  {syncStatusIcon(sync.sync_status)}
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-medium text-foreground capitalize">{sync.sync_status}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Records</p>
                    <p className="font-medium text-foreground">{sync.record_count || 0}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last synced</p>
                    <p className="font-medium text-foreground text-xs">
                      {sync.last_synced_at ? new Date(sync.last_synced_at).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                  {sync.error_message && (
                    <div className="bg-destructive/10 border border-destructive/30 rounded p-2 mt-2">
                      <p className="text-xs text-destructive">{sync.error_message}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-lg p-6 text-center">
            <p className="text-muted-foreground">Source management coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContentReviewCenter;
