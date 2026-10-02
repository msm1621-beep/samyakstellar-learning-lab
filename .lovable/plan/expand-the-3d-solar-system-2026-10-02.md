# Expand the 3D Solar System

## Goal
Extend the existing 3D viewer with the requested distant objects, educational facts, historical views, and resettable event simulations while preserving current navigation and controls.

## Scope
- Add the requested comets, asteroids, dwarf planets, named major moons, nearby stellar systems within 10 light-years, and prominent brown dwarfs as selectable objects with concise facts.
- Extend the scene to a labeled, zoomable Oort Cloud and nearby-star view. Keep distances explicitly schematic so the inner planets remain usable; show real host/companion relationships for confirmed binary and planetary systems.
- Add six selectable timeline stages (4.5 billion years ago, 500 million years ago, 49 million years ago, 650,000 years ago, 70,000 years ago, and present), an Earth-view planetary-alignment mode, and a resettable event selector for solar storm, planetary asteroid encounter, and comet flyby scenarios.
- Keep the 3D scene interactive and the controls readable on phone, tablet, and desktop. Event/timeline views are educational visualizations, not precision ephemerides or predictions.

## Technical approach
- Keep the current React Three Fiber scene; add a typed astronomy catalogue and keep its orbit/event state explicit, with frame-rate-independent motion.
- Reuse the existing coin-free viewer and existing component styling/tokens; do not change unrelated subscription, account, notification, or backend behavior.
- Use one reset action to clear the event, restore the present-day view, and return the camera/scene to the default solar-system state.

## Verification
- Build and inspect the live viewer at desktop and mobile-sized layouts.
- Verify selectable objects/facts, moon counts, star-system companions, timeline selection, event selection/reset, and Earth-alignment mode; check browser console/runtime errors and the latest build log.
