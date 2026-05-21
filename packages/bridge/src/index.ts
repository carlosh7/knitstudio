let parentOrigin = "";
let validOrigins: string[] = [];

function getValidOrigins(): string[] {
  if (validOrigins.length === 0) {
    validOrigins = [
      typeof window !== "undefined" ? window.location.origin : "",
      "http://localhost:3000",
      "https://studio.knitstudio.io",
    ];
  }
  return validOrigins;
}

export function setParentOrigin(origin: string) {
  if (isValidOrigin(origin)) {
    parentOrigin = origin;
  }
}

export function isValidOrigin(origin: string): boolean {
  return getValidOrigins().includes(origin);
}

export function sendMessage(type: string, payload: unknown) {
  window.parent.postMessage({ type, payload, source: "knitstudio-bridge" }, parentOrigin);
}

export function onMessage(type: string, handler: (payload: unknown) => void) {
  const listener = (event: MessageEvent) => {
    if (!isValidOrigin(event.origin)) return;
    if (event.data?.source === "knitstudio-bridge") return;
    if (event.data?.type === type) {
      handler(event.data.payload);
    }
  };
  window.addEventListener("message", listener);
  return () => window.removeEventListener("message", listener);
}

// Auto-init: receive parent origin handshake
if (typeof window !== "undefined" && window.parent !== window) {
  onMessage("bridge:handshake", (payload) => {
    if (typeof payload === "string") setParentOrigin(payload);
  });
  sendMessage("bridge:ready", { version: "1.0.0" });
}
