## Plan: Repair Reminders and Finish the Pending Fixes

### 1. Make notification behavior reliable and honest
- Route every notification toggle through the same notification service-worker flow; remove the older direct browser notification path.
- Keep reminders and tests in the in-app inbox even when system notifications are denied.
- Use local calendar dates and improve permission/worker error reporting in Settings.
- Clarify that scheduled browser reminders require the app to be running; true closed-app push requires a backend push service and device subscriptions.

### 2. Repair chat and doubt search
- Send the signed-in session token from Mr. & Mrs. Doom and Doubt Search instead of the public app key.
- Show a clear sign-in message when there is no session.
- Correct the invalid lesson tutor model and deploy the updated backend functions.

### 3. Repair coin spending
- Replace negative coin rewards with one guarded spending operation for subscriptions and game passes.
- Prevent stale balance checks and duplicate purchases.

### 4. Add mission-based streak levels
- Base streaks on completing all daily missions, not simply opening the app.
- Advance one level after three fully completed days and generate the next missions from that level’s space topic.
- Persist level progress and correct the daily-mission badge counter.

### Verification
- Run focused tests/build checks, deploy changed backend functions, and exercise notification settings, inbox fallback, chat authorization, purchases, and mission progression in the live app.
