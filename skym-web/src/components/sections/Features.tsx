"use client";

import { useState, useEffect, useRef } from "react";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      title: "Holistic Yoga Classes",
      description:
        "Experience a variety of yoga styles led by certified instructors, suitable for all levels and ages.",
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
      details: [
        "Hatha, Vinyasa, Yin & Restorative",
        "Beginner to advanced sessions",
        "Small group & private classes",
        "Certified yoga instructors",
      ],
      color: "primary",
    },
    {
      title: "Wellness Workshops",
      description:
        "Join our regular workshops on mindfulness, meditation, nutrition, and holistic health practices.",
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
      details: [
        "Mindfulness & meditation",
        "Nutrition & healthy cooking",
        "Stress management",
        "Guest expert sessions",
      ],
      color: "secondary",
    },
    {
      title: "Personalized Health Plans",
      description:
        "Receive tailored wellness programs including yoga, diet, and lifestyle guidance for your unique needs.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <rect
            x="4"
            y="4"
            width="16"
            height="16"
            rx="4"
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
      details: [
        "One-on-one consultations",
        "Custom yoga routines",
        "Diet & nutrition advice",
        "Progress tracking",
      ],
      color: "accent",
    },
    {
      title: "Therapeutic Treatments",
      description:
        "Relax and rejuvenate with our range of holistic therapies including massage, Ayurveda, and naturopathy.",
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
            d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4"
          />
        </svg>
      ),
      details: [
        "Ayurvedic therapies",
        "Deep tissue & relaxation massage",
        "Naturopathy consultations",
        "Detox & wellness packages",
      ],
      color: "success",
    },
    {
      title: "Modern Facilities",
      description:
        "Enjoy a serene environment with state-of-the-art studios, meditation rooms, and wellness amenities.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <rect
            x="3"
            y="7"
            width="18"
            height="10"
            rx="2"
            stroke="currentColor"
            strokeWidth={2}
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 7V5a5 5 0 0110 0v2"
          />
        </svg>
      ),
      details: [
        "Spacious yoga studios",
        "Meditation & relaxation zones",
        "Herbal tea lounge",
        "Clean, eco-friendly environment",
      ],
      color: "info",
    },
    {
      title: "Community & Support",
      description:
        "Be part of a supportive community with group events, retreats, and ongoing guidance from our team.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth={2} />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2"
          />
        </svg>
      ),
      details: [
        "Group yoga & meditation",
        "Wellness retreats",
        "Member events & socials",
        "Ongoing expert support",
      ],
      color: "warning",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Yoga Enthusiast",
      content:
        "The instructors are amazing and the atmosphere is so peaceful. My health and flexibility have improved tremendously!",
      avatar: "P",
      rating: 5,
    },
    {
      name: "Rahul Mehta",
      role: "Corporate Professional",
      content:
        "The personalized health plan helped me manage stress and improve my lifestyle. Highly recommended for anyone seeking wellness.",
      avatar: "R",
      rating: 5,
    },
    {
      name: "Anjali Verma",
      role: "Wellness Seeker",
      content:
        "The workshops and therapies are top-notch. I always leave feeling rejuvenated and inspired.",
      avatar: "A",
      rating: 5,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section id="features" ref={sectionRef} className="py-20 ">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Yoga & Wellness Features
          </h2>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto leading-relaxed">
            Discover our holistic approach to health and wellbeing, offering a
            range of yoga, wellness, and therapeutic services for your mind,
            body, and soul.
          </p>
        </div>

        {/* Interactive Feature Showcase */}
        <div
          className={`mb-20 transition-all duration-700 delay-300 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Feature Details */}
            <div className="space-y-6">
              <div className="tabs tabs-boxed bg-base-100 place-content-stretch gap-4">
                {features.slice(0, 3).map((feature, index) => (
                  <button
                    key={feature.title}
                    className={`tab transition-all duration-300 ${
                      activeFeature === index ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    {feature.title.split(" ")[0]}
                  </button>
                ))}
              </div>

              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <div
                    className={`p-3 rounded-full w-fit mb-4 bg-${features[activeFeature].color}/20 text-${features[activeFeature].color}`}
                  >
                    {features[activeFeature].icon}
                  </div>
                  <h3 className="card-title text-2xl mb-3">
                    {features[activeFeature].title}
                  </h3>
                  <p className="text-base-content/80 mb-6 leading-relaxed">
                    {features[activeFeature].description}
                  </p>
                  <ul className="space-y-2">
                    {features[activeFeature].details.map((detail, idx) => (
                      <li key={idx} className="flex items-center">
                        <svg
                          className="w-4 h-4 text-success mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature Visualization */}
            <div className="relative">
              <div className="mockup-browser bg-base-100 border shadow-xl">
                <div className="mockup-browser-toolbar">
                  <div className="input">http://shreekrishayogamandiram.in</div>
                </div>
                <div className=" flex justify-center px-4 py-16">
                  <div className="text-center space-y-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-${features[activeFeature].color} to-${features[activeFeature].color} flex items-center justify-center text-white animate-pulse`}
                    >
                      {features[activeFeature].icon}
                    </div>
                    <h4 className="text-xl font-bold">
                      {features[activeFeature].title}
                    </h4>
                    <div className="text-sm text-base-content/70">
                      Wellness Demo
                    </div>
                    <div className="progress progress-primary w-32"></div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 card bg-success text-success-content w-24 shadow-lg">
                <div className="card-body p-3 text-center">
                  <div className="text-xs">Members</div>
                  <div className="text-lg font-bold">500+</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 card bg-primary text-primary-content w-24 shadow-lg">
                <div className="card-body p-3 text-center">
                  <div className="text-xs">Classes/Week</div>
                  <div className="text-lg font-bold">30+</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div
          className={`mb-20 transition-all duration-700 delay-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`card bg-base-100 shadow-lg card-hover transition-all duration-300 cursor-pointer ${
                  index === activeFeature ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setActiveFeature(index)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-body text-center">
                  <div
                    className={`mx-auto mb-4 p-3 rounded-full w-fit bg-${feature.color}/20 text-${feature.color}`}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="card-title text-lg justify-center mb-2">
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

        {/* Testimonials */}
        <div
          className={`transition-all duration-700 delay-700 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">What Our Members Say</h3>
            <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
              Hear from our community about their transformative experiences at
              our yoga and health centre.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="card bg-base-100 shadow-xl card-hover"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <div className="avatar placeholder mr-4">
                      <div className="bg-neutral text-neutral-content rounded-full w-12">
                        <span className="text-lg">{testimonial.avatar}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-base-content/70">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>

                  <div className="rating rating-sm mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        className="mask mask-star-2 bg-orange-400"
                        checked
                        readOnly
                      />
                    ))}
                  </div>

                  <p className="text-base-content/80 italic leading-relaxed">
                    {testimonial.content}
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

export default Features;
