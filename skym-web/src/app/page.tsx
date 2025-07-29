import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Contact from "@/components/sections/Contact";
import ReviewForm from "@/components/sections/ReviewForm";

export default function Home() {
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
