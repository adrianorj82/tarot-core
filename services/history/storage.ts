import { Reading } from "./types";

const KEY = "tarot_readings";

// proteção total contra SSR
function isBrowser() {
  return typeof window !== "undefined";
}

export function getReadings(): Reading[] {
  if (!isBrowser()) return [];

  try {
    const data = window.localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveReading(reading: Reading) {
  if (!isBrowser()) return;

  const all = getReadings();
  window.localStorage.setItem(
    KEY,
    JSON.stringify([reading, ...all])
  );
}

export function deleteReading(id: string) {
  if (!isBrowser()) return;

  const all = getReadings().filter((r) => r.id !== id);
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function clearReadings() {
  if (!isBrowser()) return;

  window.localStorage.removeItem(KEY);
}