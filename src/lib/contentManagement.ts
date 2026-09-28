// Frontend integration with Content Management System
import { supabase } from '@/integrations/supabase/client';

export interface ContentItem {
  id: string;
  content_type: 'fact' | 'article' | 'quiz_question' | 'mission' | 'discovery' | 'celestial_body' | 'space_news' | 'educational_content';
  title: string;
  body: string;
  freshness_status: 'current' | 'review_needed' | 'outdated' | 'updating' | 'verified';
  verification_status?: 'unverified' | 'pending_review' | 'verified' | 'disputed';
  source_url?: string;
  source_name?: string;
  source_date?: string;
  last_reviewed_at?: string;
  last_updated_at?: string;
  category?: string;
}

export interface ContentReview {
  id: string;
  content_id: string;
  review_type: 'new_content' | 'update_proposal' | 'freshness_check' | 'verification' | 'quality_check';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'approved' | 'rejected' | 'postponed';
  description: string;
  created_at: string;
}

/**
 * Fetch content by type with freshness filtering
 */
export async function getContentByType(
  contentType: ContentItem['content_type'],
  onlyVerified = true
): Promise<ContentItem[]> {
  let query = supabase
    .from('content_items')
    .select('*')
    .eq('content_type', contentType);

  if (onlyVerified) {
    query = query.eq('freshness_status', 'verified');
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

/**
 * Get content that needs review
 */
export async function getContentNeedingReview(): Promise<ContentReview[]> {
  const { data, error } = await supabase
    .from('content_review_queue')
    .select('*')
    .in('status', ['pending', 'in_progress'])
    .order('priority', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get sync status across targets
 */
export async function getSyncStatus() {
  const { data, error } = await supabase
    .from('sync_status')
    .select('*');

  if (error) throw error;
  return data || [];
}

/**
 * Get audit trail for a content item
 */
export async function getContentAuditTrail(contentId: string) {
  const { data, error } = await supabase
    .from('content_updates')
    .select('*')
    .eq('content_id', contentId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get content sources
 */
export async function getContentSources() {
  const { data, error } = await supabase
    .from('content_sources')
    .select('*')
    .eq('is_active', true);

  if (error) throw error;
  return data || [];
}

/**
 * Mark content as reviewed (with freshness status)
 */
export async function markContentReviewed(contentId: string, freshnessStatus: 'current' | 'outdated' = 'current') {
  const { data, error } = await supabase.rpc('mark_content_reviewed', {
    content_id: contentId,
    freshness: freshnessStatus,
  });

  if (error) throw error;
  return data;
}
