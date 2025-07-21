"use client";

import { useState, useEffect, useRef } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    classes: 0,
    students: 0,
    years: 0,
    satisfaction: 0,
  });

  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { label: "Yoga Classes Conducted", value: 1200, suffix: "+", icon: "🧘" },
    { label: "Happy Students", value: 800, suffix: "+", icon: "😊" },
    { label: "Years of Service", value: 15, suffix: "+", icon: "⏳" },
    { label: "Satisfaction Rate", value: 98, suffix: "%", icon: "🌟" },
  ];

  const features = [
    {
      title: "Experienced Instructors",
      description:
        "Our certified yoga teachers guide you with expertise and compassion for all levels.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0l-3 3m3-3l3 3M12 18v-6"
          />
        </svg>
      ),
    },
    {
      title: "Holistic Wellness",
      description:
        "We focus on physical, mental, and spiritual well-being through traditional yoga practices.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={2}
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h8"
          />
        </svg>
      ),
    },
    {
      title: "Community Events",
      description:
        "Regular workshops, retreats, and group sessions foster a vibrant yoga community.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5"
          />
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth={2} />
        </svg>
      ),
    },
    {
      title: "Personalized Attention",
      description:
        "Small class sizes and individual guidance ensure every student’s growth and comfort.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateStats();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateStats = () => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    stats.forEach((stat, index) => {
      let currentValue = 0;
      const targetValue = stat.value;
      const stepValue = targetValue / steps;

      const timer = setInterval(() => {
        currentValue += stepValue;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(timer);
        }

        setAnimatedStats((prev) => ({
          ...prev,
          [index === 0
            ? "classes"
            : index === 1
              ? "students"
              : index === 2
                ? "years"
                : "satisfaction"]: Math.floor(currentValue),
        }));
      }, increment);
    });
  };

  const getAnimatedValue = (index: number) => {
    switch (index) {
      case 0:
        return animatedStats.classes;
      case 1:
        return animatedStats.students;
      case 2:
        return animatedStats.years;
      case 3:
        return animatedStats.satisfaction;
      default:
        return 0;
    }
  };

  return (
    <section id="about" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            About Shree Krishna Yoga Kendra
          </h2>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto leading-relaxed">
            Join us for yoga classes that will help you improve your physical,
            mental, and spiritual well-being. Our experienced instructors will
            guide you through each session with personalized attention and
            support. Namaste!
          </p>
        </div>

        {/* Stats Section */}
        <div
          className={`mb-20 transition-all duration-700 delay-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="stats stats-vertical lg:stats-horizontal shadow-xl bg-base-100 w-full">
            {stats.map((stat, index) => (
              <div key={stat.label} className="stat place-items-center">
                <div className="stat-figure text-4xl">{stat.icon}</div>
                <div className="stat-title text-base-content/70">
                  {stat.label}
                </div>
                <div className="stat-value text-primary">
                  {getAnimatedValue(index)}
                  {stat.suffix}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Content */}
          <div
            className={`transition-all duration-700 delay-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <h3 className="text-3xl font-bold mb-6">
              Embrace Wellness, Discover Yourself
            </h3>
            <p className="text-lg text-base-content/80 mb-6 leading-relaxed">
              For over 15 years, Shree Krishna Yoga Kendra has been a sanctuary
              for yoga enthusiasts and beginners alike. Our mission is to help
              you achieve balance, flexibility, and inner peace through
              authentic yoga practices and personalized guidance.
            </p>
            <p className="text-lg text-base-content/80 mb-8 leading-relaxed">
              We offer a variety of classes including Hatha Yoga, Pranayama,
              Meditation, and Yoga Therapy. Our instructors are passionate about
              helping each student progress at their own pace, ensuring a safe
              and supportive atmosphere.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="badge badge-primary badge-lg p-4 font-semibold">
                Hatha Yoga
              </div>
              <div className="badge badge-secondary badge-lg p-4 font-semibold">
                Pranayama
              </div>
              <div className="badge badge-accent badge-lg p-4 font-semibold">
                Meditation
              </div>
              <div className="badge badge-neutral badge-lg p-4 font-semibold">
                Yoga Therapy
              </div>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div
            className={`transition-all duration-700 delay-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <div className="mockup-window bg-base-300 shadow-xl">
              <div className=" flex justify-center px-4 py-16">
                <div className="text-center">
                  <div className="avatar-group -space-x-6 rtl:space-x-reverse mb-4">
                    <div className="avatar">
                      <div className="w-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">K</span>
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-12 bg-gradient-to-r from-secondary to-accent rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">Y</span>
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-12 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">T</span>
                      </div>
                    </div>
                    <div className="avatar placeholder">
                      <div className="w-12 bg-neutral text-neutral-content rounded-full flex items-center justify-center">
                        <span>+8</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Our Yoga Team</h4>
                  <p className="text-base-content/70">
                    Certified instructors guiding your wellness journey
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div
          className={`transition-all duration-700 delay-900 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose Shree Krishna Yoga Kendra?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`card bg-base-100 shadow-xl card-hover transition-all duration-300`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-body text-center">
                  <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit text-primary">
                    {feature.icon}
                  </div>
                  <h4 className="card-title text-lg justify-center">
                    {feature.title}
                  </h4>
                  <p className="text-base-content/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
