import { useEffect, useRef } from 'react';

export default function useScrollAnimation(threshold = 0.1) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold,
      rootMargin: '0px 0px -40px 0px',
    });

    // Observe the element itself and all fade-in-up children
    observer.observe(node);
    node.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
