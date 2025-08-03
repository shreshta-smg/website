import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_KEY;

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "api",
  },
  auth: {
    persistSession: true,
  },
});
