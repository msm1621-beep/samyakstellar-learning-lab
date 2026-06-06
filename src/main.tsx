import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { hydrateFromCookies, installLocalStorageCookieMirror } from "./lib/cookieStorage";

// Restore account + progress from cookies if localStorage was cleared,
// then mirror future writes so the two stay in sync.
hydrateFromCookies();
installLocalStorageCookieMirror();

createRoot(document.getElementById("root")!).render(<App />);
