"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackHomeButton } from "../_components/BackHomeButton";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerImageZoomDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: true,
            markers: false,
          },
        })
        .to(imageRef.current, {
          scale: 2,
          z: 350,
          transformOrigin: "center center",
          ease: "power1.inOut",
        })
        .to(
          heroRef.current,
          {
            scale: 1.1,
            transformOrigin: "center center",
            ease: "power1.inOut",
          },
          "<"
        );
    },
    { scope: containerRef }
  );

  return (
    <main className="w-full overflow-hidden bg-black">
      <BackHomeButton />

      <div ref={containerRef} className="relative w-full z-[1]">
        <div className="relative w-full overflow-hidden">
          <section
            ref={heroRef}
            className="w-full h-screen bg-center bg-no-repeat bg-cover bg-[url('https://images.unsplash.com/photo-1589848315097-ba7b903cc1cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]"
          ></section>
        </div>
        <div className="absolute top-0 left-0 right-0 z-[2] w-full h-screen overflow-hidden [perspective:500px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imageRef}
            src="https://assets-global.website-files.com/63ec206c5542613e2e5aa784/643312a6bc4ac122fc4e3afa_main%20home.webp"
            alt="图片缩放演示"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950 text-white text-4xl font-bold">
        向下滚动区域
      </div>
    </main>
  );
}
