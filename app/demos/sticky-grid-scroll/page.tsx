"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BackHomeButton } from "../_components/BackHomeButton";

gsap.registerPlugin(ScrollTrigger);

export default function StickyGridScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const images = containerRef.current?.querySelectorAll("img");
    if (!images || images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loaded = 0;
    const checkComplete = () => {
      loaded++;
      if (loaded === images.length) {
        setImagesLoaded(true);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        checkComplete();
      } else {
        img.addEventListener("load", checkComplete);
        img.addEventListener("error", checkComplete);
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", checkComplete);
        img.removeEventListener("error", checkComplete);
      });
    };
  }, []);

  useGSAP(() => {
    if (!imagesLoaded) return;

    // Lenis Setup
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.4,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Grid Animation Logic
    const block = containerRef.current?.querySelector(".block-main");
    const wrapper = block?.querySelector(".block-wrapper");
    const content = block?.querySelector(".content-main");
    const title = block?.querySelector(".content-title") as HTMLElement;
    const description = block?.querySelector(".content-description");
    const button = block?.querySelector(".content-button");
    const grid = block?.querySelector(".gallery-grid") as HTMLElement;
    const items = block?.querySelectorAll(".gallery-item");

    if (!block || !wrapper || !content || !title || !description || !button || !grid || !items) {
      return;
    }

    gsap.set([description, button], { opacity: 0, pointerEvents: "none" });

    const dy = (content.clientHeight - title.clientHeight) / 2;
    const titleOffsetY = (dy / content.clientHeight) * 100;
    gsap.set(title, { yPercent: titleOffsetY });

    const numColumns = 3;
    const columns: HTMLElement[][] = Array.from({ length: numColumns }, () => []);
    items.forEach((item, index) => {
      columns[index % numColumns].push(item as HTMLElement);
    });

    gsap.from(wrapper, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: block,
        start: "top bottom",
        end: "top top",
        scrub: true,
      },
    });

    gsap.from(title, {
      opacity: 0,
      duration: 0.7,
      ease: "power1.out",
      scrollTrigger: {
        trigger: block,
        start: "top 57%",
        toggleActions: "play none none reset",
      },
    });

    const gridRevealTimeline = () => {
      const timeline = gsap.timeline();
      const wh = window.innerHeight;
      const dyGrid = wh - (wh - grid.offsetHeight) / 2;

      columns.forEach((column, colIndex) => {
        const fromTop = colIndex % 2 === 0;
        timeline.from(
          column,
          {
            y: dyGrid * (fromTop ? -1 : 1),
            stagger: {
              each: 0.06,
              from: fromTop ? "end" : "start",
            },
            ease: "power1.inOut",
          },
          "grid-reveal"
        );
      });
      return timeline;
    };

    const gridZoomTimeline = () => {
      const timeline = gsap.timeline({ defaults: { duration: 1, ease: "power3.inOut" } });
      timeline.to(grid, { scale: 2.05 });
      timeline.to(columns[0], { xPercent: -40 }, "<");
      timeline.to(columns[2], { xPercent: 40 }, "<");
      timeline.to(
        columns[1],
        {
          yPercent: (index) => (index < Math.floor(columns[1].length / 2) ? -1 : 1) * 40,
          duration: 0.5,
          ease: "power1.inOut",
        },
        "-=0.5"
      );
      return timeline;
    };

    const toggleContent = (isVisible = true) => {
      gsap.timeline({ defaults: { overwrite: true } })
        .to(title, {
          yPercent: isVisible ? 0 : titleOffsetY,
          duration: 0.7,
          ease: "power2.inOut",
        })
        .to(
          [description, button],
          {
            opacity: isVisible ? 1 : 0,
            duration: 0.4,
            ease: `power1.${isVisible ? "inOut" : "out"}`,
            pointerEvents: isVisible ? "all" : "none",
          },
          isVisible ? "-=90%" : "<"
        );
    };

    const animateGridOnScroll = () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: "top 25%",
          end: "bottom bottom",
          scrub: true,
        },
      });

      timeline
        .add(gridRevealTimeline())
        .add(gridZoomTimeline(), "-=0.6")
        .add(() => {
          if (timeline.scrollTrigger) {
            toggleContent(timeline.scrollTrigger.direction === 1);
          }
        }, "-=0.32");
    };

    animateGridOnScroll();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: containerRef, dependencies: [imagesLoaded] });

  return (
    <div className="font-sans text-[16px] bg-white text-black" ref={containerRef} style={{ opacity: imagesLoaded ? 1 : 0, transition: "opacity 0.3s" }}>
      <main>
        <BackHomeButton />
        <section className="relative z-[1]">
          <figure className="relative flex justify-center items-center w-full h-screen px-[calc(24*100vw/1440)] m-0">
            <img className="absolute top-0 left-0 w-full h-full object-cover bg-gray-300 block" src="/demos/sticky-grid-scroll/8.webp" alt="图片 8" />
            <figcaption className="relative w-[calc(221*100vw/1440)] text-[calc(14*100vw/1440)] leading-[1.3] uppercase text-center text-white">
              滚动驱动布局实验
            </figcaption>
          </figure>
        </section>
        <section className="block-main h-[425vh]">
          <div className="block-wrapper sticky top-0 px-[calc(24*100vw/1440)] overflow-hidden will-change-transform">
            <div className="content-main relative flex flex-col justify-center items-center w-full h-screen text-center z-[1]">
              <h2 className="content-title w-[calc(924*100vw/1440)] font-serif text-[calc(104*100vw/1440)] leading-[1.15] tracking-[-0.02em] m-0">
                粘性网格滚动
              </h2>
              <p className="content-description w-[calc(455*100vw/1440)] mt-[calc(24*100vw/1440)] text-[calc(14*100vw/1440)] leading-[1.3] uppercase mb-0">
                通过滚动驱动的位移与缩放，图片网格在粘性场景中分层展开，形成更具节奏感的视觉体验。
              </p>
              <p className="content-button mt-[calc(32*100vw/1440)] text-[calc(14*100vw/1440)] uppercase block">滚动驱动布局实验</p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(736*100vw/1440)]">
              <ul className="gallery-grid grid grid-cols-3 gap-x-[calc(32*100vw/1440)] gap-y-[calc(40*100vw/1440)] will-change-transform list-none p-0 m-0">
                {Array.from({ length: 12 }).map((_, i) => (
                  <li key={i} className="gallery-item w-full aspect-square will-change-transform">
                    <img className="w-full h-full object-cover bg-gray-300 block" src={`/demos/sticky-grid-scroll/${i + 1}.webp`} alt={`图片 ${i + 1}`} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
