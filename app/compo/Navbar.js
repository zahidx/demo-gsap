"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Navbar() {
  const navRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(
      linksRef.current,
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <nav ref={navRef} className="fixed w-full top-0 bg-gray-900 shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-white text-2xl font-bold">Brand</h1>
        <ul className="flex space-x-6">
          {["Home", "About", "GSAP", "Contact"].map((link, index) => (
            <li
              key={index}
              ref={(el) => (linksRef.current[index] = el)}
            >
              <Link
                href={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                className="text-white text-lg hover:text-yellow-400 transition duration-300"
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
