# Project architecture decisions

- Keep subscription state and billing rules in `SubscriptionContext`; expose subscription plan controls only through `FeaturedShop` so current entitlements remain stable while the shop becomes the sole management interface.
- Keep the Solar System's astronomy catalogues and exploration state local to its viewer experience, with schematic positions and approximate or uncertain distances explicitly labeled, so educational views do not imply precision ephemerides.
