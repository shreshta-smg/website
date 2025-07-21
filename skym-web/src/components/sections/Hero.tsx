"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const slides = [
    {
      title: "स्वागतम, श्री कृष्ण योग केन्द्र।",
      subtitle: "Yoga & Wellness for Every Body",
      description:
        "Experience holistic health, inner peace, and rejuvenation at SKYM – your sanctuary for yoga, meditation, and mindful living.",
      cta: "Join a Class",
      // Lemonade-inspired gradient: a blend of yellow and light pink/orange
      backgroundGradient: "from-yellow-200 to-pink-300",
    },
    {
      title: "योगेन भवतः जीवनं परिवर्तयतु।",
      subtitle: "Ancient Wisdom, Modern Approach",
      description:
        "Our certified instructors guide you through traditional and contemporary yoga practices for all ages and abilities.",
      cta: "View Timetable",
      // Lemonade-inspired gradient: light pink/orange to a slightly deeper pink/purple
      backgroundGradient: "from-pink-300 to-purple-400",
    },
    {
      title: "शरीर, मन एवं आत्मा का पोषण।",
      subtitle: "Wellness Beyond the Mat",
      description:
        "Discover workshops, therapies, and community events designed to support your complete well-being at SKYM.",
      cta: "Contact Us",
      // Lemonade-inspired gradient: a brighter yellow to a light blue or greenish-blue
      backgroundGradient: "from-yellow-100 to-blue-300",
    },
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // const goToSlide = (index: number) => {
  //   setCurrentSlide(index);
  // };

  const currentSlideData = slides[currentSlide];

  return (
    <section id="home" className="hero min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div
        className={`hero-overlay bg-gradient-to-br ${currentSlideData.backgroundGradient} opacity-40 transition-all duration-1000`}
      ></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent animate-pulse"></div>
      </div>

      <div
        className={`hero-content text-center text-neutral-content transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
      >
        <div className="max-w-4xl">
          {/* Main Title */}
          <h1 className="mb-5 text-5xl md:text-7xl text-primary font-bold leading-tight">
            {currentSlideData.title}
          </h1>

          {/* Subtitle */}
          <h2 className="mb-5 text-2xl md:text-3xl text-primary font-light opacity-90">
            {currentSlideData.subtitle}
          </h2>

          {/* Description */}
          <p className="mb-8 text-lg md:text-xl max-w-2xl mx-auto text-primary opacity-80 leading-relaxed">
            {currentSlideData.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#contact"
              className="btn btn-lg btn-primary btn-animate hover:btn-accent font-semibold px-8"
            >
              {currentSlideData.cta}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="#about"
              className="btn btn-lg btn-outline btn-accent btn-animate hover:bg-primary hover:text-accent-content bg-accent text-primary-content font-semibold px-8"
            >
              Learn More
            </Link>
          </div>

          {/* Features Preview */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center animate-fade-in">
              <div className="bg-accent bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="accentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg text-primary font-semibold mb-2">
                Certified Instructors
              </h3>
              <p className="text-sm opacity-75 text-primary">
                Learn from experienced and passionate yoga teachers
              </p>
            </div>

            <div
              className="text-center animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-accent bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="accentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-primary">
                Holistic Wellness
              </h3>
              <p className="text-sm opacity-75 text-primary">
                Yoga, meditation, and therapies for mind-body balance
              </p>
            </div>

            <div
              className="text-center animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="bg-accent bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="accentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-primary">
                Community & Support
              </h3>
              <p className="text-sm opacity-75 text-primary">
                Join a welcoming community and supportive environment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href="#about">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
