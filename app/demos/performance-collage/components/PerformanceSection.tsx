"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { performanceImages, performanceImgPositions } from "../constants";

gsap.registerPlugin(ScrollTrigger);

export function PerformanceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      gsap.fromTo(
        ".performance-content p",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".performance-content p",
            start: "top bottom",
            end: "top center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      const isMobile = window.matchMedia("(max-width: 1024px)").matches;
      if (isMobile) return;

      const timeline = gsap.timeline({
        defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
        scrollTrigger: {
          trigger: sectionEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      performanceImgPositions.forEach((item) => {
        if (item.id === "p5") return;

        const selector = `.${item.id}`;
        const vars: { left?: string; right?: string; bottom?: string } = {};

        if (typeof item.left === "number") vars.left = `${item.left}%`;
        if (typeof item.right === "number") vars.right = `${item.right}%`;
        if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;

        timeline.to(selector, vars, 0);
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="performance" className="w-full h-full overflow-hidden pt-[110px] flex flex-col items-center relative" ref={sectionRef}>
      <h2 className="text-white text-[clamp(30px,6vw,72px)] max-w-[980px] text-center leading-[1.1] font-bold px-5 relative z-20 mb-10">
        更强图形性能，带来更沉浸的视觉体验
      </h2>
      <div className="w-[min(1400px,100vw)] h-[55vh] relative mt-3 z-10 max-[1024px]:h-[52vh]">
        {performanceImages.map((item, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={item.src}
            className={`max-w-[420px] object-cover object-center max-[1024px]:max-w-[180px] ${item.id} ${
              item.id === "p1"
                ? "absolute bottom-1/2 left-[23%] z-[1] max-[1024px]:left-[33%]"
                : item.id === "p2"
                  ? "absolute bottom-[40%] right-[17%] z-[3] max-[1024px]:right-[37%]"
                  : item.id === "p3"
                    ? "absolute bottom-1/4 right-[15%] z-[2] max-[1024px]:right-[35%]"
                    : item.id === "p4"
                      ? "absolute bottom-[15%] right-[10%] z-[1] max-[1024px]:right-[30%]"
                      : item.id === "p5"
                        ? "absolute bottom-[20%] left-1/2 -translate-x-1/2 scale-150"
                        : item.id === "p6"
                          ? "absolute bottom-1/4 left-1/4 z-[2] max-[1024px]:left-[35%]"
                          : "absolute bottom-[5%] left-[15%] z-[3] max-[1024px]:left-[35%]"
            }`}
            alt={`性能拼贴图片 ${index + 1}`}
          />
        ))}
      </div>
      <div className="performance-content mt-[72px] mx-auto max-w-[760px] px-5 pb-[120px]">
        <div className="grid gap-[14px]">
          <p>
            实现原理可以理解成“中间定锚点 + 周围做位移”：先让 `p5` 主图固定在中心，再把其他图片按滚动进度移动到目标坐标。
          </p>
          <p>
            GSAP 时间线会同时控制多张图的位置变化，所以滚动时你看到的是一个整体拼贴在展开，而不是每张图各自乱动。
          </p>
        </div>

        <div className="mt-[22px] bg-[#0b0b0d] border border-[#242428] rounded-[14px] overflow-hidden">
          <p className="m-0 px-[14px] py-[10px] text-left text-[13px] text-[#b5b5bd] border-b border-[#242428]">核心实现示例</p>
          <pre className="m-0 p-[14px] overflow-x-auto">
            <code>{`// 1) 创建滚动绑定的时间线
const timeline = gsap.timeline({
  defaults: { duration: 2, ease: "power1.inOut" },
  scrollTrigger: {
    trigger: sectionEl,
    start: "top bottom",
    end: "bottom top",
    scrub: 1, // 滚动多少，动画走多少
  },
});

// 2) 批量把外围图片移动到目标位置
performanceImgPositions.forEach((item) => {
  if (item.id === "p5") return; // 中心主图不参与位移

  const vars = {};
  if (typeof item.left === "number") vars.left = \`\${item.left}%\`;
  if (typeof item.right === "number") vars.right = \`\${item.right}%\`;
  if (typeof item.bottom === "number") vars.bottom = \`\${item.bottom}%\`;

  timeline.to(\`.\${item.id}\`, vars, 0); // 同一时间点开始，形成整体展开
});`}</code>
          </pre>
        </div>

        <div className="mt-4 grid gap-[10px]">
          <p>
            把多张图先堆在一起，滚动时再按预设路线把它们“推”到各自位置。因为所有动画挂在同一个时间线上，
            所以视觉上会很统一，像一整块画面被拉开。
          </p>
          <p>
            同时文案做了一个轻微淡入上移（`opacity + y`），让用户在看完拼贴展开后自然接收到解释信息，不会显得突兀。
          </p>
        </div>
      </div>
    </section>
  );
}
