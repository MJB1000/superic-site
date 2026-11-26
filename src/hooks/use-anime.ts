import { useEffect, useRef } from "react";
import anime from "animejs";

type AnimeParams = anime.AnimeParams;

/**
 * Runs an anime.js animation when the element enters the viewport.
 * Returns a ref to attach to the target element.
 */
export function useAnimeOnView(params: Omit<AnimeParams, "targets">, options?: { threshold?: number; once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!options?.once || !hasAnimated.current)) {
          hasAnimated.current = true;
          anime({
            targets: el.children.length > 0 && params.delay ? Array.from(el.children) : el,
            ...params,
          });
        }
      },
      { threshold: options?.threshold ?? 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * Stagger-reveal children when parent enters viewport.
 */
export function useStaggerReveal(options?: { delay?: number; duration?: number; translateY?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];
    children.forEach((child) => {
      child.style.opacity = "0";
      child.style.transform = `translateY(${options?.translateY ?? 20}px)`;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anime({
            targets: children,
            opacity: [0, 1],
            translateY: [options?.translateY ?? 20, 0],
            duration: options?.duration ?? 600,
            delay: anime.stagger(options?.delay ?? 80),
            easing: "easeOutCubic",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
