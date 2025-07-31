// src/components/auth/AuthStatus.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client"; // Adjust path
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();

    // Listen for auth state changes (e.g., login, logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
      if (event === "SIGNED_OUT") {
        router.refresh(); // Refresh to clear server component cache
        router.push("/login"); // Redirect to login page
      } else if (event === "SIGNED_IN") {
        router.refresh(); // Refresh to re-fetch server components
      }
    });

    return () => {
      subscription.unsubscribe(); // Clean up subscription on unmount
    };
  }, [supabase, router]); // Depend on supabase and router to avoid stale closures

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      setLoading(false);
    }
    // Redirection and refresh handled by onAuthStateChange listener
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <span className="loading loading-spinner loading-sm"></span>
        <span className="text-sm text-gray-400">Loading user...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <button
          onClick={handleLogout}
          className="btn btn-sm btn-error"
          disabled={loading}
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <Link href="/login" className="btn btn-sm btn-secondary">
      Log In
    </Link>
  );
}
