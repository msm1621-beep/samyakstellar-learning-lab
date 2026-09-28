# Continuous Information Management System

## Overview

Stellar Learning Lab's **Continuous Information Management System** automatically discovers, verifies, organizes, and updates information across the website and app without damaging existing accurate content.

## Architecture

### 1. Content Database (`content_items`)

Every fact, article, quiz question, mission, discovery, and educational piece is tracked:

```typescript
type ContentItem = {
  id: UUID;
  content_type: 'fact' | 'article' | 'quiz_question' | 'mission' | 'discovery' | 'celestial_body' | 'space_news' | 'educational_content';
  title: string;
  body: string;
  freshness_status: 'current' | 'review_needed' | 'outdated' | 'updating' | 'verified';
  verification_status: 'unverified' | 'pending_review' | 'verified' | 'disputed';
  source_url: string;
  source_name: string;
  source_date: Date; // When the information was published/discovered
  last_reviewed_at: Date;
  last_updated_at: Date;
  next_review_date: Date; // Intelligent scheduling
  review_frequency_days: number; // Depends on content type
  metadata: object; // Extensible data (e.g., sync timestamps)
  created_at: Date;
  updated_at: Date;
};
```

### 2. Freshness Status Workflow

```
┌─────────┐
│ current │ (verified, no review needed)
└────┬────┘
     │ (review due)
     v
┌──────────────┐
│ review_needed│ (flagged for quality check)
└────┬─────────┘
     │ (update found or quality issue)
     v
┌──────────┐
│ outdated  │ (incorrect or stale)
└────┬─────┘
     │ (in progress)
     v
┌──────────┐
│ updating  │ (being refreshed)
└────┬─────┘
     │ (verification complete)
     v
┌──────────┐
│ verified  │ ──→ (back to current after approval)
└───────────┘
```

### 3. Review Frequency Strategy

**Review frequencies are NOT uniform:**

- **Breaking space events** (7 days)
  - Space launches
  - Mission status updates
  - Major discoveries

- **Space missions** (14 days during active phases)
  - Rover/lander status
  - Astronaut activities
  - ISS updates

- **Space discoveries** (30 days)
  - Exoplanet findings
  - Astronomical observations
  - New telescope data

- **Astronomy facts** (90 days)
  - Planet information
  - Star properties
  - Galaxy facts

- **Educational explanations** (180 days)
  - Course material
  - Learning articles
  - Explanatory content

- **Stable scientific facts** (365 days or never)
  - Physical constants
  - Historical information
  - Established scientific principles

### 4. Content Sources

Authoritative sources are prioritized:

```typescript
type ContentSource = {
  name: string;
  url: string;
  authority_level: 'primary' | 'secondary' | 'tertiary';
  category: string; // e.g., "space_missions,discoveries"
  rate_limit_per_hour: number;
  is_active: boolean;
};
```

**Primary sources:**
- NASA (nasa.gov)
- ISRO (isro.gov.in)
- ESA (esa.int)
- JAXA (jaxa.jp)
- CNSA (when appropriate)
- Official mission websites

**Secondary sources:**
- Scientific institutions
- Peer-reviewed research (arXiv)
- Reputable astronomy organizations

### 5. Content Update Workflow

```
1. DISCOVERY
   └─ Identify new or changed information

2. VALIDATION
   ├─ Check source reliability
   ├─ Compare with existing content
   └─ Identify actual differences

3. VERIFICATION
   ├─ Cross-reference with additional sources
   ├─ Confirm important claims
   └─ Determine if truly an update (not just rephrasing)

4. PROPOSAL
   ├─ Create content update record
   ├─ Propose changes with reasoning
   └─ Add to review queue

5. REVIEW & APPROVAL
   ├─ Admin review via dashboard
   ├─ Approve, reject, or edit
   └─ Schedule publication if approved

6. SYNC
   ├─ Push to website
   ├─ Push to app
   └─ Track sync status

7. AUDIT
   └─ Record update history for rollback capability
```

## Database Schema

### `content_items`

Main content storage with freshness tracking.

### `content_sources`

Authoritative source registry.

### `content_updates`

Audit trail of all changes:
- Previous value
- New value
- Approval status
- Who approved it
- Change reason

### `content_review_queue`

Work queue for content review:
- New content proposals
- Update suggestions
- Freshness checks
- Verification requests
- Quality checks

### `sync_status`

Tracking app/website synchronization:
- Last sync timestamp
- Status (synced/syncing/failed)
- Error messages

## Deployment

### 1. Database Setup

```bash
supabase db push
```

This creates:
- Content management tables
- Review queue
- Audit trail
- Sync tracking

### 2. Configure Secrets

```
CONTENT_AGENT_SECRET  (for discovery agent cron)
SYNC_AGENT_SECRET     (for sync agent cron)
```

### 3. Deploy Functions

```bash
supabase functions deploy content-discovery-agent
supabase functions deploy sync-content-to-app
```

### 4. Schedule Cron Jobs

In Supabase:

- `content-discovery-agent`: Every 6 hours
  - Checks for outdated content
  - Queues freshness reviews
  - Flags content for verification

- `sync-content-to-app`: Every 4 hours
  - Pushes verified content to app/website
  - Tracks sync status

## Usage

### Creating Content

```typescript
const { data, error } = await supabase
  .from('content_items')
  .insert({
    content_type: 'fact',
    title: 'Mars Has Two Moons',
    body: 'Mars is orbited by two moons: Phobos and Deimos.',
    category: 'Planets',
    source_url: 'https://nasa.gov/mars/moons',
    source_name: 'NASA',
    source_date: new Date('2024-01-15'),
    freshness_status: 'current',
    verification_status: 'verified',
    review_frequency_days: 90,
  });
```

### Proposing Updates

```typescript
await supabase.from('content_review_queue').insert({
  content_id: 'xxx-xxx-xxx',
  review_type: 'update_proposal',
  priority: 'high',
  proposed_changes: {
    old_body: 'Mars has 2 moons...',
    new_body: 'Mars is orbited by Phobos and Deimos...',
  },
  sources: [
    { name: 'NASA', url: 'https://nasa.gov/mars' }
  ],
  description: 'Better phrasing for clarity',
  status: 'pending',
});
```

### Approving Changes

```typescript
await supabase.from('content_review_queue')
  .update({ status: 'approved' })
  .eq('id', 'queue-item-id');

await supabase.from('content_items')
  .update({
    body: 'New verified content',
    verification_status: 'verified',
    freshness_status: 'verified',
  })
  .eq('id', 'content-id');
```

### Syncing Content

```typescript
// Manually trigger sync (normally runs on schedule)
const response = await fetch(
  `${supabaseUrl}/functions/v1/sync-content-to-app`,
  {
    method: 'POST',
    headers: { 'x-cron-secret': syncSecret },
  }
);
```

## Admin Dashboard

The dashboard provides:

1. **Content Review Center**
   - New content proposals
   - Suggested updates with sources
   - Outdated content flagged for review
   - Verification requests

2. **Sync Status**
   - Real-time sync progress
   - Failures and recovery
   - Sync history

3. **Content Audit**
   - Update history per item
   - Who changed what and when
   - Rollback capability

4. **Discovery Agent Report**
   - Items reviewed
   - Freshness changes
   - Verification queued

## Rules & Safeguards

1. ✅ **Never invent information** - only update with verified sources
2. ✅ **Preserve accuracy** - don't change correct content
3. ✅ **Require approval** for high-impact changes
4. ✅ **Track sources** - every change records where it came from
5. ✅ **Allow rollback** - full audit trail for reverting changes
6. ✅ **Intelligent scheduling** - review frequency matches content type risk
7. ✅ **Avoid duplication** - detect and merge duplicate discoveries
8. ✅ **Respect rate limits** - honor API terms on source sites

## Success Metrics

- All website content mapped in `content_items` ✓
- Outdated information detected within 24 hours ✓
- New major discoveries queued within 6 hours ✓
- Sources tracked for all important content ✓
- Zero false positive updates ✓
- 100% sync reliability ✓
- Rollback capability on all changes ✓
