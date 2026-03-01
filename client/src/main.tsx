import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Only register service worker in browser (not in Capacitor native app)
const isNative = window.location.protocol === "capacitor:";
if ("serviceWorker" in navigator && !isNative) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

function dismissSplash() {
  const splash = document.getElementById("splash-screen");
  if (splash) {
    splash.classList.add("fade-out");
    setTimeout(() => splash.remove(), 300);
  }
}

if (document.readyState === "complete") {
  dismissSplash();
} else {
  window.addEventListener("load", dismissSplash);
}
