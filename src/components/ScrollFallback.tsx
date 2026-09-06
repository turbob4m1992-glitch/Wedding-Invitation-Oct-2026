import React, { useEffect } from 'react';

const ScrollFallback: React.FC = () => {
  useEffect(() => {
    // Check if the browser supports native scroll-driven animations
    if (!CSS.supports('(animation-timeline: view()) and (animation-range: entry)')) {
      
      // Fallback implementation using IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scroll-fallback-visible');
              entry.target.classList.remove('scroll-fallback-hidden');
              // Unobserve after revealing to mimic `viewport={{ once: true }}` behavior
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15, // Trigger when 15% visible
        }
      );

      // Find all elements trying to use native scroll reveal and give them the fallback initial state
      document.querySelectorAll('.scroll-reveal').forEach((el) => {
        el.classList.add('scroll-fallback-hidden');
        observer.observe(el);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  // This is a logic-only component, renders nothing
  return null;
};

export default ScrollFallback;
