/** Load Bravura before any staff draws. A 404 or hang is a hard fail. */

const BRAVURA_URL = "/fonts/bravura.woff2";
const LOAD_MS = 5000;

let ready: Promise<void> | null = null;

function wait(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    window.setTimeout(() => reject(new Error("Bravura load timed out")), ms);
  });
}

async function loadBravura(): Promise<void> {
  const res = await fetch(BRAVURA_URL);
  if (!res.ok) {
    throw new Error(`Bravura HTTP ${res.status}`);
  }
  try {
    await document.fonts.load("16px Bravura");
  } catch {
    throw new Error("Bravura font face failed");
  }
}

export function notationFontsReady(): Promise<void> {
  if (typeof document === "undefined") {
    return Promise.reject(new Error("Bravura requires a browser"));
  }
  if (!ready) {
    ready = Promise.race([loadBravura(), wait(LOAD_MS)]);
  }
  return ready;
}
