import Link from "next/link";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";

const demos = [
  {
    id: "performance-collage",
    title: "滚动驱动拼贴动画",
    description: "参考 Apple 风格 Performance 区块拆分：中心主图与周围图片在滚动中展开，并配合文案渐入。",
    image: "/demos/performance/performance5.jpg",
    href: "/demos/performance-collage",
    tags: ["GSAP", "ScrollTrigger", "拼贴布局"],
  },
  {
    id: "mask-showcase",
    title: "Mask 遮罩滚动",
    description: "从 Apple 风格 Showcase 中拆分出的遮罩特效：滚动固定区间内进行遮罩放大与内容淡入。",
    image: "/mask-logo.svg",
    href: "/demos/mask-showcase",
    tags: ["GSAP", "ScrollTrigger", "Mask"],
  },
  {
    id: "airpods-frame-sequence",
    title: "AirPods 帧动画",
    description: "基于滚动进度驱动序列帧切换，复刻产品展示页常见的逐帧动画体验。",
    image: "/demos/airpods-frame-sequence/assets/png_sequence/Untitled%20Linked%20Comp%200120.png",
    href: "/demos/airpods-frame-sequence",
    tags: ["序列帧", "滚动驱动", "产品展示"],
  },
  {
    id: "scrolltrigger-image-zoom",
    title: "ScrollTrigger 图片缩放",
    description: "使用 GSAP ScrollTrigger 实现电影感滚动缩放效果：固定容器并随滚动放大图片。",
    image: "https://assets-global.website-files.com/63ec206c5542613e2e5aa784/643312a6bc4ac122fc4e3afa_main%20home.webp",
    href: "/demos/scrolltrigger-image-zoom",
    tags: ["GSAP", "ScrollTrigger", "动画"],
  },
  {
    id: "horizontal-parallax-gallery",
    title: "横向视差画廊",
    description: "基于 GSAP ScrollTrigger 的 containerAnimation，构建顺滑的横向滚动画廊与图片视差效果。",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=3506&auto=format&fit=crop",
    href: "/demos/horizontal-parallax-gallery",
    tags: ["GSAP", "横向滚动", "视差"],
  },
  {
    id: "sticky-grid-scroll",
    title: "粘性网格滚动",
    description:
      "Codrops 风格的粘性区块：通过滚动驱动网格揭示、缩放与 Lenis 丝滑滚动，并使用 React 重构。",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
    href: "/demos/sticky-grid-scroll",
    tags: ["GSAP", "ScrollTrigger", "Lenis", "网格"],
  },
];

export default function HubPage() {

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-800">
      <header className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-lg tracking-tight">UI 实验室</span>
          </div>
          <nav>
            <a
              href="https://github.com/xiangshu233/scroll-motion-lab"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-4 h-4 fill-current"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.12.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.34-1.74-1.34-1.74-1.1-.75.08-.73.08-.73 1.22.09 1.86 1.25 1.86 1.25 1.08 1.86 2.84 1.32 3.53 1.01.11-.79.42-1.32.76-1.62-2.67-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.61-5.48 5.91.43.37.82 1.1.82 2.22 0 1.61-.02 2.91-.02 3.31 0 .32.21.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-2xl mb-12 lg:mb-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
            交互式 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">实验集</span>
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl">
            基于 React、GSAP 与 Tailwind CSS 打造的创意编码实验、UI 组件与动画集合。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {demos.map((demo) => (
            <Link key={demo.id} href={demo.href} className="group outline-none block h-full">
              <Card className="p-0 gap-0 h-full flex flex-col bg-zinc-900/80 border border-zinc-700/80 overflow-hidden transition-all duration-300 hover:border-zinc-500 hover:shadow-xl hover:shadow-indigo-500/10 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl relative backdrop-blur-sm">
                <div className="aspect-video overflow-hidden relative bg-zinc-800 rounded-t-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={demo.image}
                    alt={demo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent opacity-60"></div>
                </div>
                <CardHeader className="p-5 flex-1 flex flex-col items-start text-left">
                  <div className="flex flex-wrap items-center gap-2 mb-3 w-full">
                    {demo.tags.map(tag => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-zinc-800 text-zinc-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <CardTitle className="text-xl text-zinc-100 group-hover:text-indigo-400 transition-colors w-full">
                    {demo.title}
                  </CardTitle>
                  <CardDescription className="text-zinc-400 mt-2 line-clamp-2 text-sm leading-relaxed w-full">
                    {demo.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-5 pt-0 border-t-0 bg-transparent flex items-center text-sm font-medium text-indigo-400 mt-auto justify-start w-full">
                  <span className="flex items-center">
                    查看演示
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
