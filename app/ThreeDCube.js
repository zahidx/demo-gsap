"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ThreeDCube() {
  const cubeRef = useRef(null);

  useEffect(() => {
    gsap.to(cubeRef.current, {
      rotationX: 360,
      rotationY: 360,
      duration: 8,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <section className="py-20 bg-gray-900 text-center">
      <h2 className="text-3xl font-bold mb-8">3D Interactions</h2>
      <div
        className="mx-auto"
        style={{
          width: "150px",
          height: "150px",
          perspective: "800px",
        }}
      >
        <div
          ref={cubeRef}
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute w-full h-full flex items-center justify-center bg-gray-700 border border-white"
            style={{ transform: "translateZ(75px)" }}
          >
            Front
          </div>
          <div
            className="absolute w-full h-full flex items-center justify-center bg-gray-700 border border-white"
            style={{ transform: "rotateY(180deg) translateZ(75px)" }}
          >
            Back
          </div>
          <div
            className="absolute w-full h-full flex items-center justify-center bg-gray-700 border border-white"
            style={{ transform: "rotateY(90deg) translateZ(75px)" }}
          >
            Right
          </div>
          <div
            className="absolute w-full h-full flex items-center justify-center bg-gray-700 border border-white"
            style={{ transform: "rotateY(-90deg) translateZ(75px)" }}
          >
            Left
          </div>
          <div
            className="absolute w-full h-full flex items-center justify-center bg-gray-700 border border-white"
            style={{ transform: "rotateX(90deg) translateZ(75px)" }}
          >
            Top
          </div>
          <div
            className="absolute w-full h-full flex items-center justify-center bg-gray-700 border border-white"
            style={{ transform: "rotateX(-90deg) translateZ(75px)" }}
          >
            Bottom
          </div>
        </div>
      </div>
    </section>
  );
}
