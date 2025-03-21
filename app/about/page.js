"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Import Lucid Icons from lucide-react
import { Sun, Heart, User, MessageSquare, Phone, Laptop, Lock, Star } from "lucide-react"; // More icons
import HoverClickInteraction from "./HoverClickInteraction";


gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const iconRefs = useRef([]);
  const pathRef = useRef(null);
  const featureCardsRef = useRef([]);
  const sectionRefs = useRef([]);
  const hoverCardRefs = useRef([]);

  useEffect(() => {
    // Title animation: Fade-in and 3D rotation effect with motion blur
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: -150,
        rotationX: 90,
        scale: 0.8,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 2,
        ease: "back.out(1.7)",
        delay: 0.5,
        motionBlur: true,
      }
    );

    // Paragraph animation: Slide from left and skew
    gsap.fromTo(
      paragraphRef.current,
      {
        opacity: 0,
        x: -150,
        skewX: -20,
      },
      {
        opacity: 1,
        x: 0,
        skewX: 0,
        duration: 1.5,
        delay: 1,
        ease: "power4.out",
      }
    );

    // Advanced icon animation: 3D flip with perspective
    const iconTimeline = gsap.timeline({ delay: 1.5 });
    iconTimeline
      .fromTo(
        iconRefs.current,
        {
          opacity: 0,
          scale: 0,
          rotationY: -360,
          rotationX: 180,
          perspective: 1000,
        },
        {
          opacity: 1,
          scale: 1.2,
          rotationY: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power2.out",
          stagger: 0.1,
        }
      )
      .to(
        iconRefs.current,
        {
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)",
          stagger: 0.1,
        },
        "+=0.3"
      );

    // Path animation: Morph path and add easing
    gsap.fromTo(
      pathRef.current,
      {
        strokeDasharray: pathRef.current.getTotalLength(),
        strokeDashoffset: pathRef.current.getTotalLength(),
        strokeWidth: 0,
      },
      {
        strokeDashoffset: 0,
        strokeWidth: 2,
        duration: 3,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: pathRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Feature Cards Animation: Flip effect on scroll
    gsap.fromTo(
      featureCardsRef.current,
      {
        opacity: 0,
        rotationY: 180,
        scale: 0.8,
      },
      {
        opacity: 1,
        rotationY: 0,
        scale: 1,
        stagger: 0.3,
        duration: 1.5,
        scrollTrigger: {
          trigger: featureCardsRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Parallax effect with dynamic background movement
    gsap.to(".parallax-bg", {
      y: "50%",
      x: "10%",
      scale: 1.1,
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        ease: "power1.inOut",
      },
    });

    // Hover Effects for Cards with 3D scaling and rotation
    hoverCardRefs.current.forEach((card) => {
      gsap.to(card, {
        scale: 1.1,
        rotationX: 20,
        rotationY: 20,
        duration: 0.5,
        paused: true,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 py-12">
      {/* Parallax Section */}
      <section className="relative mb-16 parallax-section">
        <div className="parallax-bg absolute inset-0 bg-gradient-to-r from-[#380643] to-[#0E1628] opacity-40"></div>
        <div className="relative z-10 text-center text-white">
          <h1 ref={titleRef} className="text-5xl font-extrabold">About GSAP</h1>
          <p ref={paragraphRef} className="text-lg mt-6 text-gray-300">
            GSAP (GreenSock Animation Platform) is a powerful JavaScript library that allows for high-performance animations on the web.
          </p>
        </div>
      </section>

      {/* Icon Animation Section */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16">
        {[Sun, Heart, User, MessageSquare, Phone, Laptop, Lock, Star].map((Icon, index) => (
          <div
            key={index}
            ref={(el) => (iconRefs.current[index] = el)}
            className="flex justify-center items-center p-6 rounded-full bg-gray-700 shadow-lg cursor-pointer hover:scale-110 transition-transform"
          >
            <Icon className="h-16 w-16 text-yellow-400" />
          </div>
        ))}
      </section>

      {/* SVG Path Animation */}
      <section className="relative mb-16">
        <svg width="100%" height="200" viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            ref={pathRef}
            d="M10 20 C 30 10, 60 10, 80 20 C 90 40, 90 80, 80 100 C 60 130, 30 130, 10 100"
            stroke="yellow"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </section>

      {/* Feature Cards Section */}
      <section ref={sectionRefs} className="text-center bg-gray-800 py-12">
        <h2 className="text-3xl font-bold">Features of GSAP</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8" ref={featureCardsRef}>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
            <Heart className="h-12 w-12 text-yellow-400" />
            <h3 className="mt-4 text-xl font-semibold">Performance</h3>
            <p className="text-gray-300 mt-2">GSAP ensures fast, efficient animations with minimal impact on performance.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
            <Lock className="h-12 w-12 text-yellow-400" />
            <h3 className="mt-4 text-xl font-semibold">Security</h3>
            <p className="text-gray-300 mt-2">GSAP is a secure, trusted library widely used in production environments.</p>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-md hover:scale-105 transition-transform">
            <Star className="h-12 w-12 text-yellow-400" />
            <h3 className="mt-4 text-xl font-semibold">Cross-browser Support</h3>
            <p className="text-gray-300 mt-2">It provides excellent cross-browser compatibility for all modern browsers.</p>
          </div>
        </div>
      </section>

      <HoverClickInteraction />


      {/* Hover/Click Interaction Section */}
      
    </div>
  );
}
