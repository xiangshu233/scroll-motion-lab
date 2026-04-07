"use client";

import { useEffect, useRef } from "react";
import { BackHomeButton } from "../_components/BackHomeButton";

const START_FRAME = 101;
const TOTAL_FRAMES = 165;
const FRAME_COUNT = TOTAL_FRAMES - START_FRAME + 1;

const getFrameSrc = (frame: number) =>
  `/demos/airpods-frame-sequence/assets/png_sequence/${encodeURIComponent(
    `Untitled Linked Comp ${String(frame).padStart(4, "0")}.png`
  )}`;

function ScrollAnimation() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafPendingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrameByIndex(currentFrameRef.current);
    };

    const drawFrameByIndex = (index: number) => {
      const image = imagesRef.current[index];
      if (!image || !image.complete) return;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      currentFrameRef.current = index;
    };

    const preloadImages = () => {
      const images = Array.from({ length: FRAME_COUNT }, (_, index) => {
        const image = new Image();
        image.src = getFrameSrc(START_FRAME + index);
        return image;
      });

      imagesRef.current = images;

      images[0].onload = () => {
        drawFrameByIndex(0);
      };
    };

    const updateFrameFromScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const maxScrollableInSection = rect.height - window.innerHeight;
      if (maxScrollableInSection <= 0) return;

      const scrolledInSection = Math.min(
        maxScrollableInSection,
        Math.max(0, -rect.top)
      );
      const scrollFraction = scrolledInSection / maxScrollableInSection;
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.ceil(scrollFraction * (FRAME_COUNT - 1))
      );

      if (frameIndex !== currentFrameRef.current) {
        drawFrameByIndex(frameIndex);
      }
    };

    const handleScroll = () => {
      if (rafPendingRef.current) return;
      rafPendingRef.current = true;

      requestAnimationFrame(() => {
        updateFrameFromScroll();
        rafPendingRef.current = false;
      });
    };

    preloadImages();
    resizeCanvas();
    updateFrameFromScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <main className="bg-black text-white">
      <section className="h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-[clamp(36px,7vw,88px)] leading-[1.1] font-bold">AirPods Pro</h1>
          <p className="mt-4 text-[clamp(16px,2.2vw,26px)] text-[#86868b]">向下滚动进入帧动画区</p>
        </div>
      </section>

      <section ref={sectionRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden isolate">
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <h1 className="text-9xl font-semibold text-white">AirPods Pro</h1>
          </div>
          <canvas ref={canvasRef} className="absolute inset-0 z-10 h-full w-full" />
        </div>
      </section>

      <section className="min-h-screen px-5 py-20">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="max-w-[820px] mx-auto">
            <h2 className="text-white text-[clamp(28px,6vw,72px)] leading-[1.1] font-bold">帧序列滚动实现</h2>
            <div className="mt-7 grid gap-4 text-[clamp(16px,2vw,22px)] leading-[1.6] text-[#86868b]">
              <p>核心思路是把一组 PNG 当作“离散视频帧”，然后将滚动进度映射到帧索引，再绘制到全屏 canvas。</p>
              <p>
                由于是 `canvas` 逐帧渲染，不依赖 React 状态频繁更新，所以滚动时更稳定，也更容易做大尺寸全屏视觉。
              </p>
            </div>
            <div className="mt-6 bg-[#0b0b0d] border border-[#242428] rounded-[14px] overflow-hidden">
              <p className="m-0 px-3.5 py-2.5 text-[13px] text-[#b5b5bd] border-b border-[#242428]">核心逻辑</p>
              <pre className="m-0 p-3.5 overflow-x-auto">
                <code className='text-[#e6e6eb] text-[13px] leading-[1.6] font-mono'>{`// 1) 预加载整组序列帧
const images = Array.from({ length: FRAME_COUNT }, (_, i) => {
  const img = new Image();
  img.src = getFrameSrc(START_FRAME + i);
  return img;
});

// 2) 计算“当前滚动进度”对应的帧索引
const scrolledInSection = Math.min(maxScrollable, Math.max(0, -rect.top));
const progress = scrolledInSection / maxScrollable;
const frameIndex = Math.min(FRAME_COUNT - 1, Math.ceil(progress * (FRAME_COUNT - 1)));

// 3) 将该帧绘制到全屏 canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);`}</code>
              </pre>
            </div>
            <div className="mt-[18px] grid gap-3 text-[15px] leading-[1.7] text-[#9a9aa3]">
              <p>
                页面结构是“上占位 section + 中间动画 section + 下说明 section”。中间动画区用 `sticky` 固定在视口，内部 canvas
                始终铺满屏幕。
              </p>
              <p>
                滚动监听通过 `requestAnimationFrame` 节流，把高频 scroll 回调合并到浏览器绘制时机执行，减少抖动和无效重绘。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
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
