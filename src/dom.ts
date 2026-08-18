/** Runs `callback` once <body> exists, whether the script sits in head or not. */
export function whenReady(callback: () => void): void {
  if (typeof document === "undefined") return;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
  } else {
    callback();
  }
}
