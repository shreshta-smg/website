import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Contact from "@/components/sections/Contact";
import ReviewForm from "@/components/sections/ReviewForm";
import WelcomePage from "@/components/ui/Welcome";
import VisitorTracker from "@/components/ui/VisitorTracker";
export const dynamic = "force-dynamic";
export default function Home() {
  return (
    <section>
      <WelcomePage />
      <Hero />
      <About />
      <Features />
      <ReviewForm />
      <Contact />
      <VisitorTracker />
    </section>
  );
}
