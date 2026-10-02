# Project architecture decisions

- Keep subscription state and billing rules in `SubscriptionContext`; expose subscription plan controls only through `FeaturedShop` so current entitlements remain stable while the shop becomes the sole management interface.
- Keep the Solar System's astronomy catalogue and simulation state local to its viewer experience, with historical positions clearly marked schematic, so educational controls remain self-contained and do not imply precision ephemerides.
