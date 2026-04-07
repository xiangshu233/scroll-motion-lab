"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BackHomeButton } from "../_components/BackHomeButton";

gsap.registerPlugin(ScrollTrigger);

export default function MaskShowcaseDemo() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const update = () => setIsTablet(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useGSAP(() => {
    if (isTablet) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#mask-showcase",
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
      },
    });

    timeline
      .to(".mask-media img", {
        scale: 1.1,
      })
      .to(".mask-content", { opacity: 1, y: 0, ease: "power1.in" });
  }, [isTablet]);

  return (
    <main className="min-h-screen bg-black text-[#86868b]">
      <BackHomeButton />

      <section className="h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-white text-[clamp(36px,7vw,88px)] leading-[1.1] font-bold">Mask Showcase</h1>
          <p className="mt-4 text-[clamp(16px,2.2vw,26px)] text-[#86868b]">向下滚动进入遮罩动画区</p>
        </div>
      </section>

      <section id="mask-showcase" className="relative min-h-screen">
        <div className="relative h-screen overflow-hidden">
          <video
            className="w-full h-screen object-cover object-center"
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            loop
            muted
            autoPlay
            playsInline
          />
          <div className="mask-media absolute inset-0 w-full h-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mask-logo.svg"
              alt="mask"
              className={`absolute inset-0 h-full min-w-screen object-cover object-center origin-center ${
                isTablet ? "w-full [transform:matrix(1,0,0,1,0,0)]" : "w-full [transform:matrix(80,0,0,80,0,0)]"
              }`}
            />
          </div>
        </div>

        <div
          className={`mask-content relative z-10 bg-black ${
            isTablet ? "opacity-100 translate-y-0 mt-0" : "opacity-0 translate-y-6 -mt-[120px]"
          }`}
        >
          <div className="w-full max-w-[1200px] mx-auto px-5 pt-6 pb-20">
            <div className="max-w-[820px] mx-auto">
              <h2 className="text-white text-[clamp(28px,6vw,72px)] leading-[1.1] font-bold">Mask 遮罩滚动演示</h2>
              <div className="mt-7 grid gap-4 text-[clamp(16px,2vw,22px)] leading-[1.6]">
                <p>
                  实现原理很简单：先把一段视频铺满全屏，再盖一张带镂空文字（Apple + M4）的遮罩图。
                </p>
                <p>
                  你滚动页面时，GSAP 会把这块区域临时“钉”在屏幕上，然后按滚动距离去放大遮罩。因为文字是透明镂空，你看到的就像视频只在字里流动，整体像镜头在往前推。
                </p>
              </div>
              <div className="mt-6 bg-[#0b0b0d] border border-[#242428] rounded-[14px] overflow-hidden">
                <p className="m-0 px-3.5 py-2.5 text-[13px] text-[#b5b5bd] border-b border-[#242428]">核心逻辑</p>
                <pre className="m-0 p-3.5 overflow-x-auto">
                  <code className='text-[#e6e6eb] text-[13px] leading-[1.6] font-mono'>{`// 1) 创建一个和滚动绑定的时间线
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#mask-showcase", // 以展示区作为触发器
    start: "top top",          // 顶部碰到视口顶部时开始
    end: "+=150%",             // 多给一段滚动距离，让动画更顺滑
    scrub: true,               // 把滚动进度映射到动画进度
    pin: true,                 // 动画期间把该区域“钉”在屏幕上
  },
});

// 2) 先放大遮罩（形成镜头推进感）
// 3) 再让下方文案淡入并上移到位
tl.to(".mask img", { scale: 1.1 })
  .to(".content", { opacity: 1, y: 0, ease: "power1.in" });`}</code>
                </pre>
              </div>
              <div className="mt-[18px] grid gap-3 text-[15px] leading-[1.7] text-[#9a9aa3]">
                <p>
                  详细理解可以把它想成三层：最底层是视频，中间层是带镂空字形的 mask，最上层是文字内容。平时你看到的是黑底，
                  只有镂空字的位置透出视频。
                </p>
                <p>
                  当滚动进入展示区时，`pin: true` 会把这块区域固定住；接着 `scrub: true` 让“滚动距离”直接驱动“动画进度”。
                  所以你每滚一点，遮罩就放大一点，视觉上就是镜头在慢慢推近。最后把内容区淡入，
                  告诉用户动画阶段结束并进入说明信息。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center text-center px-6">
        <div className="mt-4 text-[clamp(16px,2.2vw,26px)] text-[#86868b]">下方还有更多内容</div>
      </section>
    </main>
  );
}
