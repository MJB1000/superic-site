import anime from "animejs";

export type AnimationKey =
  | "fadeUp"
  | "blurIn"
  | "slideLeft"
  | "scaleZoom"
  | "typewriter"
  | "splitLetters"
  | "parallax"
  | "glitch"
  | "curtain"
  | "staggerLines";

interface Targets {
  hero?: HTMLElement | null;
  title?: HTMLElement | null;
  meta?: HTMLElement | null;
}

/** Wrap each character of an element's text in a span so we can animate it. */
function splitChars(el: HTMLElement) {
  const text = el.textContent || "";
  el.textContent = "";
  const frag = document.createDocumentFragment();
  for (const ch of text) {
    const span = document.createElement("span");
    span.textContent = ch;
    span.style.display = "inline-block";
    span.style.whiteSpace = ch === " " ? "pre" : "normal";
    frag.appendChild(span);
  }
  el.appendChild(frag);
  return el.querySelectorAll("span");
}

export function playPostAnimation(key: AnimationKey | undefined, t: Targets) {
  const k: AnimationKey = key || "fadeUp";
  const { hero, title, meta } = t;

  // Reset
  [hero, title, meta].forEach((el) => {
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "none";
    el.style.filter = "none";
  });

  switch (k) {
    case "blurIn":
      if (hero)
        anime({
          targets: hero,
          opacity: [0, 1],
          filter: ["blur(24px)", "blur(0px)"],
          duration: 1200,
          easing: "easeOutQuart",
        });
      if (title)
        anime({
          targets: title,
          opacity: [0, 1],
          filter: ["blur(12px)", "blur(0px)"],
          translateY: [12, 0],
          duration: 1100,
          delay: 250,
          easing: "easeOutQuart",
        });
      if (meta) anime({ targets: meta, opacity: [0, 1], duration: 700, delay: 700, easing: "linear" });
      break;

    case "slideLeft":
      if (hero)
        anime({
          targets: hero,
          opacity: [0, 1],
          translateX: [-80, 0],
          duration: 900,
          easing: "easeOutCubic",
        });
      if (title)
        anime({
          targets: title,
          opacity: [0, 1],
          translateX: [-40, 0],
          duration: 800,
          delay: 200,
          easing: "easeOutCubic",
        });
      if (meta)
        anime({
          targets: meta,
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 700,
          delay: 500,
          easing: "easeOutCubic",
        });
      break;

    case "scaleZoom":
      if (hero)
        anime({
          targets: hero,
          opacity: [0, 1],
          scale: [1.15, 1],
          duration: 1300,
          easing: "easeOutQuart",
        });
      if (title)
        anime({
          targets: title,
          opacity: [0, 1],
          scale: [0.92, 1],
          duration: 800,
          delay: 400,
          easing: "easeOutBack",
        });
      if (meta) anime({ targets: meta, opacity: [0, 1], duration: 700, delay: 700, easing: "linear" });
      break;

    case "typewriter":
      if (hero)
        anime({ targets: hero, opacity: [0, 1], duration: 700, easing: "easeOutCubic" });
      if (title) {
        const chars = splitChars(title);
        title.style.opacity = "1";
        anime({
          targets: chars,
          opacity: [0, 1],
          duration: 1,
          delay: anime.stagger(35),
          easing: "linear",
        });
      }
      if (meta) anime({ targets: meta, opacity: [0, 1], duration: 600, delay: 1200, easing: "linear" });
      break;

    case "splitLetters":
      if (hero)
        anime({
          targets: hero,
          opacity: [0, 1],
          scale: [1.05, 1],
          duration: 1000,
          easing: "easeOutCubic",
        });
      if (title) {
        const chars = splitChars(title);
        title.style.opacity = "1";
        anime({
          targets: chars,
          opacity: [0, 1],
          translateY: [40, 0],
          rotate: [-8, 0],
          duration: 700,
          delay: anime.stagger(25, { start: 200 }),
          easing: "easeOutBack",
        });
      }
      if (meta) anime({ targets: meta, opacity: [0, 1], duration: 700, delay: 900, easing: "linear" });
      break;

    case "parallax":
      if (hero) {
        anime({
          targets: hero,
          opacity: [0, 1],
          translateY: [60, 0],
          scale: [1.1, 1],
          duration: 1400,
          easing: "easeOutQuart",
        });
        const img = hero.querySelector("img");
        if (img) {
          const onScroll = () => {
            const y = window.scrollY;
            (img as HTMLElement).style.transform = `translateY(${y * 0.25}px) scale(1.05)`;
          };
          window.addEventListener("scroll", onScroll, { passive: true });
        }
      }
      if (title)
        anime({
          targets: title,
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 900,
          delay: 300,
          easing: "easeOutCubic",
        });
      if (meta)
        anime({ targets: meta, opacity: [0, 1], translateY: [20, 0], duration: 700, delay: 600, easing: "easeOutCubic" });
      break;

    case "glitch":
      if (hero)
        anime({
          targets: hero,
          opacity: [0, 1, 0.4, 1, 0.7, 1],
          translateX: [0, -8, 6, -3, 0],
          duration: 800,
          easing: "steps(8)",
        });
      if (title)
        anime({
          targets: title,
          opacity: [0, 1, 0.3, 1],
          translateX: [0, 6, -4, 0],
          duration: 600,
          delay: 250,
          easing: "steps(6)",
        });
      if (meta) anime({ targets: meta, opacity: [0, 1], duration: 500, delay: 700, easing: "linear" });
      break;

    case "curtain":
      if (hero) {
        hero.style.opacity = "1";
        const inner = hero.querySelector(":scope > div") as HTMLElement | null;
        if (inner) {
          inner.style.clipPath = "inset(0 100% 0 0)";
          anime({
            targets: inner,
            clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
            duration: 1100,
            easing: "easeInOutQuart",
          });
        } else {
          anime({ targets: hero, opacity: [0, 1], duration: 800, easing: "linear" });
        }
      }
      if (title)
        anime({
          targets: title,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 700,
          delay: 600,
          easing: "easeOutCubic",
        });
      if (meta) anime({ targets: meta, opacity: [0, 1], duration: 600, delay: 900, easing: "linear" });
      break;

    case "staggerLines": {
      if (hero)
        anime({
          targets: hero,
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 900,
          easing: "easeOutCubic",
        });
      const elements = [title, meta].filter(Boolean) as HTMLElement[];
      anime({
        targets: elements,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 700,
        delay: anime.stagger(150, { start: 300 }),
        easing: "easeOutCubic",
      });
      break;
    }

    case "fadeUp":
    default:
      if (hero)
        anime({
          targets: hero,
          opacity: [0, 1],
          scale: [1.05, 1],
          duration: 900,
          easing: "easeOutCubic",
        });
      if (title)
        anime({
          targets: title,
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 700,
          delay: 300,
          easing: "easeOutCubic",
        });
      if (meta)
        anime({
          targets: meta,
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 700,
          delay: 500,
          easing: "easeOutCubic",
        });
      break;
  }
}
