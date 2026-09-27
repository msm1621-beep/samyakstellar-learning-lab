# Project architecture decisions

- Keep subscription state and billing rules in `SubscriptionContext`; expose subscription plan controls only through `FeaturedShop` so current entitlements remain stable while the shop becomes the sole management interface.
