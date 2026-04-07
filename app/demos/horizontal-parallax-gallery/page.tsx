"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackHomeButton } from "../_components/BackHomeButton";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=3506&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=3450&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=3540&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=3540&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=3474&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=3552&auto=format&fit=crop",
];

export default function HorizontalParallaxGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const wrapper = wrapperRef.current;
      if (!container || !wrapper) return;

      const scrollTween = gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          end: () => "+=" + (container.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
        },
      });

      const mediaImages = gsap.utils.toArray(".gallery-img");
      mediaImages.forEach((img: any) => {
        gsap.fromTo(
          img,
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentNode,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: wrapperRef }
  );

  return (
    <main className="w-full bg-zinc-950 text-white overflow-x-hidden">
      <BackHomeButton />

      <div className="h-screen flex items-center justify-center text-4xl sm:text-5xl font-bold bg-zinc-900 border-b border-zinc-800">
        <div className="text-center">
          <h1 className="mb-4">横向视差</h1>
          <p className="text-xl text-zinc-400 font-normal">向下滚动以浏览画廊</p>
        </div>
      </div>

      <div ref={wrapperRef} className="h-screen w-full overflow-hidden flex flex-col justify-center relative bg-zinc-950">
        <div
          ref={containerRef}
          className="flex px-[10vw] will-change-transform h-full items-center flex-nowrap w-max"
        >
          {images.map((src, i) => (
            <picture
              key={i}
              className="flex-shrink-0 relative overflow-hidden block"
              style={{
                aspectRatio: "4/3",
                height: "60vh",
              }}
            >
              { }
              <img
                src={src}
                alt={`画廊图片 ${i + 1}`}
                className="gallery-img absolute top-0 left-[-12.5%] w-[125%] h-full object-cover"
              />
            </picture>
          ))}
        </div>
      </div>

      <div className="h-screen flex items-center justify-center text-4xl sm:text-5xl font-bold bg-zinc-900 border-t border-zinc-800">
        下方还有更多内容
      </div>
    </main>
  );
}
