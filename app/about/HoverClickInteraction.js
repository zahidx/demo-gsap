import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaHeart, FaStar, FaLock, FaUser } from 'react-icons/fa'; // Import React Icons

const HoverClickInteraction = () => {
  const hoverCardRefs = useRef([]);

  useEffect(() => {
    hoverCardRefs.current.forEach((card, index) => {
      // Create a GSAP Timeline to handle multiple animations
      const tl = gsap.timeline({ paused: true });

      // Advanced Hover Animation with 3D perspective
      tl.fromTo(
        card,
        {
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          opacity: 0.8,
          x: 0,
          y: 0,
        },
        {
          scale: 1.2,
          rotationY: index % 2 === 0 ? 10 : -10,
          rotationX: index % 2 === 0 ? 10 : -10,
          y: -15,
          opacity: 1,
          ease: 'power2.out',
          duration: 0.5,
        }
      );

      // Play the animation when mouse enters
      card.addEventListener('mouseenter', () => {
        tl.play();
      });

      // Reverse the animation on mouse leave
      card.addEventListener('mouseleave', () => {
        tl.reverse();
      });

      // Click animation with motion path and bounce
      card.addEventListener('click', () => {
        gsap.to(card, {
          scale: 1.5,
          rotation: 720,
          duration: 0.6,
          ease: 'bounce.out',
          backgroundColor: '#FF6347', // Change background color
          boxShadow: '0 8px 30px rgba(255, 99, 71, 0.6)',
          x: 100, // Motion Path X-axis animation
          y: 100, // Motion Path Y-axis animation
        });

        // Return to original position after 1 second
        setTimeout(() => {
          gsap.to(card, {
            scale: 1,
            rotation: 0,
            backgroundColor: '#2D3748',
            boxShadow: 'none',
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'bounce.in',
          });
        }, 1000);
      });
    });

    // Staggered Animation for multiple cards when entering
    gsap.fromTo(
      hoverCardRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2, // Stagger the animation by 0.2 seconds
        duration: 1,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <section className="text-center py-12 mb-16">
      <h2 className="text-3xl font-bold mb-8">Advanced Hover & Click Interactions</h2>
      <div className="flex justify-center space-x-6">
        {[FaHeart, FaStar, FaLock, FaUser].map((Icon, index) => (
          <div
            key={index}
            ref={(el) => (hoverCardRefs.current[index] = el)}
            className="bg-gray-700 p-8 rounded-lg shadow-md w-48 h-48 flex justify-center items-center cursor-pointer"
          >
            <Icon className="h-16 w-16 text-yellow-400" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HoverClickInteraction;
