import { createClient } from "@/lib/server";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Contact from "@/components/sections/Contact";
import ReviewForm from "@/components/sections/ReviewForm";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login"); // Redirect to login if not authenticated
  }
  return (
    <section>
      <Hero />
      <About />
      <Features />
      <ReviewForm />
      <Contact />
    </section>
  );
}
