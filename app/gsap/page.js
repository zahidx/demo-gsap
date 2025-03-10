"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
  Star,
  Briefcase,
  CheckCircle,
  Coffee,
  ShoppingBag,
  GitMerge,
  User,
  Code,
  Cloud,
  Lightbulb,
  Anchor,
} from "lucide-react"; // Importing icons from lucide-react

export default function ServicePage() {
  const cardRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Advanced timeline for section entrance animation with scrollTrigger
    const sectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    sectionTimeline.fromTo(
      sectionRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1 }
    );

    // Set a 3D perspective for all cards and add scroll-triggered 3D rotation
    cardRefs.current.forEach((card, index) => {
      // Ensure the card has a 3D context
      gsap.set(card, {
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      });

      // Scroll-triggered 3D rotation: full rotation as the card scrolls into/out of view
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top bottom", // when card enters from bottom
          end: "bottom top",   // when card leaves at the top
          scrub: true,
        },
        rotationY: 360,
        ease: "none",
      });

      // Hover effect: smooth scale up and subtle 3D rotation
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.1,
          rotationX: 15,
          rotationY: 15,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      });

      // Mouse leave: revert back to default state
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.3,
          ease: "back.in(1.7)",
        });
      });

      // Click interaction: a quick scale down with a 3D twist
      card.addEventListener("click", () => {
        gsap.to(card, {
          scale: 0.95,
          rotationX: -10,
          rotationY: -10,
          duration: 0.2,
          ease: "back.in(1.7)",
        });
      });
    });

    // Animate card texts (icons & labels) on load with a slight delay
    gsap.fromTo(
      ".card-text",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 1,
        ease: "power2.out",
      }
    );

    // Stagger each card's appearance on load
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: index * 0.3,
          ease: "power2.out",
        }
      );
    });
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen px-6 py-12">
      {/* Section with Scroll Trigger Animation */}
      <section ref={sectionRef} className="text-center py-12 mb-16">
        <h2 className="text-4xl font-bold mb-8">Our Services</h2>
        <div className="service-text text-lg mb-8">
          <p>
            We offer a range of services that are designed to bring value and enhance your business or personal projects. Explore our offerings and discover how we can help you succeed.
          </p>
        </div>

        {/* 12 Cards in a responsive grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8">
          {[Heart, Star, Briefcase, CheckCircle, Coffee, ShoppingBag, GitMerge, User, Code, Cloud, Lightbulb, Anchor].map((Icon, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-gray-700 p-8 rounded-lg shadow-md w-full h-48 flex flex-col justify-center items-center cursor-pointer transition-transform"
            >
              <Icon className="h-16 w-16 text-yellow-400" />
              <div className="card-text mt-4 text-center text-white font-semibold">
                <p>Service {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
