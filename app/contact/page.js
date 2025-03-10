'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sphere } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, MapPin, User, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const cubeRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      '.contact-card',
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: containerRef.current, start: 'top center', end: 'bottom top', scrub: true } }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, scale: 0.8, rotateX: 90 },
      { opacity: 1, scale: 1, rotateX: 0, duration: 1.5, ease: 'elastic.out(1,0.6)' }
    );
  }, []);

  useEffect(() => {
    if (cubeRef.current) {
      gsap.to(cubeRef.current.rotation, {
        y: 2 * Math.PI,
        duration: 5,
        repeat: -1,
        ease: 'power1.inOut'
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen mt-12 bg-gradient-to-r from-[#08053e] via-[#08053e] to-[#08053e] text-white p-10 flex flex-col items-center gap-10 overflow-hidden relative"
    >
      <h1 className="text-6xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-500 drop-shadow-lg">
        Contact Us
      </h1>

      <Canvas className="h-[400px] w-full relative" shadows>
  <PerspectiveCamera makeDefault position={[0, 2, 5]} />
  <ambientLight intensity={1} /> {/* Increased intensity for a brighter scene */}
  <OrbitControls enableZoom={false} />
  <mesh ref={cubeRef} position={[0, 0, 0]}>
    <boxGeometry args={[2, 2, 2]} />
    <meshStandardMaterial color={'#F1C40F'} /> {/* Lighter yellow color for the cube */}
  </mesh>
  <Sphere args={[0.5, 32, 32]} position={[3, 1, 0]}>
    <meshStandardMaterial color={'#F39C12'} /> {/* Lighter orange color for the sphere */}
  </Sphere>
</Canvas>


      {/* Contact Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
        {[Mail, Phone, MapPin, User, Send, MessageCircle].map((Icon, index) => (
          <div
            key={index}
            className="contact-card flex flex-col items-center justify-center p-6 rounded-3xl bg-gray-800 shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-3d hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-900 cursor-pointer group"
          >
            <Icon className="h-14 w-14 text-yellow-400 group-hover:rotate-180 transition-all duration-500" />
            <p className="mt-4 text-lg font-semibold group-hover:text-white">{Icon.name}</p>
          </div>
        ))}
      </div>

      {/* Form Section */}
      <form
        ref={formRef}
        className="w-full max-w-lg bg-gray-800 p-10 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      >
        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-300"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-4 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-300"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="p-4 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-50 transition-all duration-300"
          />
          <button
            className="p-4 bg-yellow-400 text-gray-900 rounded-lg shadow-lg hover:bg-yellow-500 focus:outline-none transition-all duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
