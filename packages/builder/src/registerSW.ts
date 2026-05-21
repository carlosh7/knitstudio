export function registerSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Service worker registration failed (e.g. dev mode)
    });
  }
}
