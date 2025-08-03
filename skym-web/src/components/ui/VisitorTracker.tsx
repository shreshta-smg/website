// components/VisitorTracker.tsx
"use client"; // This directive makes this a Client Component

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Correct hook for App Router
import { getOrCreateUniqueVisitorId } from "../../lib/uniqueId"; // Adjust path as needed

// Optional: To show the count on the page, you'd fetch it here or pass it as a prop
// interface VisitorTrackerProps {
//   // Add props if you need to pass specific page data, like article ID
// }
type VisitorTrackerProps = object;

const VisitorTracker: React.FC<VisitorTrackerProps> = () => {
  const pathname = usePathname(); // Get current path from Next.js navigation
  const [currentViews, setCurrentViews] = useState<number | null>(null);

  useEffect(() => {
    if (pathname) {
      const visitorId = getOrCreateUniqueVisitorId();
      const pagePath = pathname; // Use the current pathname as the page identifier

      // 1. Track the visit
      fetch("/api/track-visit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ visitorId, pagePath }),
      })
        .then(async (response) => {
          if (!response.ok) {
            // Log the error response if it's not OK
            throw new Error("Failed to track visit");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Visit tracking response:", data);
          // Optionally, update the count immediately if the API returns the new count
          if (data.count !== -1) {
            // If it was a new count for this instance
            setCurrentViews(data.count);
          }
        })
        .catch((error) => {
          console.error("Error sending visit data:", error);
        });

      // 2. Fetch the current count for display (optional, separate request for fresh data)
      fetch(`/api/get-page-views?pagePath=${encodeURIComponent(pagePath)}`)
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch views");
          }
          return response.json();
        })
        .then((data) => {
          setCurrentViews(data.count);
        })
        .catch((error) => {
          console.error("Error fetching visitor count:", error);
          setCurrentViews(null);
        });
    }
  }, [pathname]); // Re-run effect when the pathname changes (user navigates to a different page)

  // This component doesn't render anything visually by default,
  // it just handles the side effect of tracking.
  // You could return JSX here if you want to display the count directly within this component.
  return (
    <>
      {/* Example: Displaying the count - you'd likely put this in your actual page/layout */}

      {currentViews !== null && (
        <p className="fixed bottom-4 left-4 bg-gray-800 text-white p-2 rounded-md text-sm">
          Total Views: {currentViews}
        </p>
      )}

      {/* Alternatively, if this component is just for tracking and not display, return null */}
    </>
  );
};

export default VisitorTracker;
