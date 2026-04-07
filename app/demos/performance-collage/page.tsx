import { BackHomeButton } from "../_components/BackHomeButton";
import { PerformanceSection } from "./components/PerformanceSection";

export default function PerformanceCollageDemo() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-black text-[#86868b]">
      <BackHomeButton />

      <section className="h-screen flex items-center justify-center text-center px-5">
        <h1 className="text-white text-[clamp(36px,7vw,88px)] leading-[1.1] font-bold">滚动驱动拼贴动画</h1>
      </section>

      <PerformanceSection />

      <section className="h-screen flex items-center justify-center text-center px-5">
        <div className="text-[#86868b] text-[clamp(18px,2vw,28px)]">下方还有更多内容</div>
      </section>
    </main>
  );
}
