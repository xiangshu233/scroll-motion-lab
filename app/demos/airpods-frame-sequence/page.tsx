"use client";

import { useEffect, useState } from "react";
import { BackHomeButton } from "../_components/BackHomeButton";

const START_FRAME = 101;
const TOTAL_FRAMES = 165;

const getFrameSrc = (frame: number) =>
  `/demos/airpods-frame-sequence/assets/png_sequence/${encodeURIComponent(
    `Untitled Linked Comp ${String(frame).padStart(4, "0")}.png`
  )}`;

function ScrollAnimation() {
  const [frame, setFrame] = useState(START_FRAME);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScroll;
      const frameIndex = Math.min(TOTAL_FRAMES, START_FRAME + Math.floor(scrollFraction * (TOTAL_FRAMES - START_FRAME)));
      setFrame(frameIndex);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-[300vh] relative bg-black">
      <div className="fixed inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-9xl text-white font-semibold absolute z-0">AirPods Pro</h1>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getFrameSrc(frame)}
          alt={`Frame ${frame}`}
          className="absolute inset-0 w-screen h-screen object-cover z-10 transition-opacity duration-300 ease-in-out"
        />
      </div>
    </div>
  );
}

export default function AirPodsFrameSequenceDemo() {
  return (
    <>
      <BackHomeButton />
      <ScrollAnimation />
    </>
  );
}
