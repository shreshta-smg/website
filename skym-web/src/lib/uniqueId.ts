// lib/uniqueId.ts
import { v4 as uuidv4 } from "uuid";

const VISITOR_ID_KEY = "unique_visitor_id";

/**
 * Gets a unique visitor ID from localStorage, or generates and stores a new one.
 * @returns {string} The unique visitor ID. Returns an empty string if window is not defined (e.g., on server-side).
 */
export function getOrCreateUniqueVisitorId(): string {
  if (typeof window === "undefined") {
    // This code runs on the server during SSR/SSG, where window is not available.
    // Unique visitor tracking is primarily a client-side concern.
    return "";
  }

  let visitorId = localStorage.getItem(VISITOR_ID_KEY);

  if (!visitorId) {
    visitorId = uuidv4();
    try {
      localStorage.setItem(VISITOR_ID_KEY, visitorId);
    } catch (e) {
      // Handle cases where localStorage might not be available (e.g., private Browse)
      console.warn(
        "LocalStorage not available or full. Cannot store unique visitor ID.",
        e,
      );
    }
  }
  return visitorId;
}
