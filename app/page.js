"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Globe, BarChart, Sparkles } from "lucide-react";
import ThreeDCube from "./ThreeDCube";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef([]);
  const iconRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaButtonRef = useRef(null);
  const exploreRef = useRef(null);

  // Click handler for the "Get Started" button
  const handleGetStarted = () => {
    // Scroll to the section with id "features"
    const targetSection = document.getElementById("features");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Fade-in for hero texts
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3 }
    );

    // Staggered buttons animation
    gsap.fromTo(
      buttonsRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.2, ease: "power2.out", delay: 0.5 }
    );

    // Scroll-triggered icon reveal
    gsap.fromTo(
      iconRef.current,
      { opacity: 0, scale: 0.5, rotate: -180 },
      {
        opacity: 1,
        scale: 1,
        rotate: 0,
        duration: 1,
        scrollTrigger: {
          trigger: iconRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Horizontal slide for features section
    gsap.fromTo(
      featuresRef.current,
      { x: "-100vw" },
      {
        x: "0",
        duration: 1.5,
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Continuous rotation on CTA button (3D spin effect)
    gsap.to(ctaButtonRef.current, {
      rotation: 360,
      repeat: -1,
      duration: 4,
      ease: "linear",
    });

    // Fade-in and scale for the Explore section on scroll
    gsap.fromTo(
      exploreRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: exploreRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 ref={titleRef} className="text-5xl font-bold">
          Welcome to GSAP Magic
        </h1>
        <p ref={subtitleRef} className="text-lg text-gray-300 mt-3">
          Experience smooth animations with GSAP
        </p>
        <div className="mt-6 flex space-x-4">
          {["Get Started", "Learn More"].map((btn, index) => (
            <button
              key={index}
              ref={(el) => (buttonsRef.current[index] = el)}
              // Only the first button gets the click handler
              onClick={index === 0 ? handleGetStarted : undefined}
              className="px-6 py-2 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition"
            >
              {btn}
            </button>
          ))}
        </div>
      </section>

      {/* Icon Section with Scroll Animation */}
      <section className="py-20 flex justify-center">
        <div ref={iconRef} className="p-6 bg-gray-800 rounded-lg shadow-lg flex space-x-10">
          {[Zap, Globe, BarChart, Sparkles].map((Icon, index) => (
            <Icon key={index} className="h-20 w-20 text-yellow-400" />
          ))}
        </div>
      </section>

      {/* Features Section with Slide Effect (target for "Get Started") */}
      <section
        id="features"
        ref={featuresRef}
        className="py-20 bg-gray-800 text-center"
      >
        <h2 className="text-3xl font-bold">Why Choose GSAP?</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {["Fast", "Smooth", "Powerful"].map((feature, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{feature}</h3>
              <p className="text-gray-300 mt-2">
                GSAP makes animations efficient and seamless.
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* 3D Interaction Section */}
      <ThreeDCube />

      {/* Explore the Magic Section */}
      <section
        ref={exploreRef}
        className="py-20 bg-gray-700 text-center px-6"
      >
        <h2 className="text-3xl font-bold mb-4">Explore the Magic</h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Dive deeper into the world of animations with immersive interactions
          and state-of-the-art 3D experiences crafted with GSAP.
        </p>
      </section>
    </div>
  );
}
