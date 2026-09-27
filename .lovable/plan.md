# Move subscriptions into Featured Shop

## What changes
- Make Featured Shop the single interface for the existing ten subscription plans, alongside all current boosts, cosmetics, and utility products.
- Retain the existing 30-day term, coin prices, benefits, daily bonus, and local subscription status. Keep existing active plans and legacy shop purchases intact.
- Add in-shop active-plan status and clear plan cards with term, benefits, price, and purchase/upgrade/downgrade/renew controls. A cancellation will end the plan at its current expiry; benefits remain active through that date.
- Remove the standalone subscription section and any subscription-specific navigation or links. Keep the existing subscription data/context as the logic source, and make sure its provider is active.
- Keep the current coin-based billing flow; no external recurring payment service is present in the existing implementation, so none will be introduced.

## Technical approach
- Reuse `SubscriptionContext` for term/status, guarded coin deductions, bonus claims, and purchases; add only the missing lifecycle actions needed by the shop.
- Render plan cards under a dedicated Featured Shop category, preserving the existing separate shop products and their purchase flow.
- Validate by checking the preview build and exercising plan visibility, purchase/status controls, retained shop items, and mobile-width layout.

## Not included
- No backend schema, authentication, or payment-provider changes.
