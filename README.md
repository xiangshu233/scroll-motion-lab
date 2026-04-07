# Scroll Motion Lab

一个用于学习和实验滚动动效的前端项目。
项目基于 Next.js + React，围绕 **GSAP / ScrollTrigger** 以及一些有意思的滚动交互（如遮罩、视差、序列帧、粘性布局）做拆解与实现。

## 项目目标

- 学习 GSAP 与 ScrollTrigger 在真实页面中的组织方式
- 通过多个可独立访问的 Demo 理解滚动驱动动画的常见模式
- 记录和沉淀“可复用”的动效结构，而不是单次效果代码

## 当前 Demo

可在首页进入各 Demo，当前包含：

- `performance-collage`：滚动驱动拼贴展开
- `mask-showcase`：遮罩放大与内容淡入
- `airpods-frame-sequence`：滚动控制序列帧动画
- `scrolltrigger-image-zoom`：固定区间图片缩放
- `horizontal-parallax-gallery`：横向滚动 + 视差画廊
- `sticky-grid-scroll`：粘性网格揭示与缩放

## 目录结构

```text
.
├─ app/
│  ├─ page.tsx                       # 首页（Demo 入口）
│  ├─ components/                    # 页面公共组件
│  └─ demos/                         # 各个动效 Demo 页面
│     ├─ _components/                # Demo 共享组件
│     ├─ airpods-frame-sequence/
│     ├─ horizontal-parallax-gallery/
│     ├─ mask-showcase/
│     ├─ performance-collage/
│     ├─ scrolltrigger-image-zoom/
│     └─ sticky-grid-scroll/
├─ components/
│  └─ ui/                            # 基础 UI 组件
├─ public/
│  └─ demos/                         # Demo 静态资源（图片、序列帧等）
└─ package.json
```

## 技术栈

- Next.js (App Router)
- React
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis（丝滑滚动实验）

## 本地运行

推荐使用 `pnpm`：

```bash
pnpm install
pnpm dev
```

启动后访问：`http://localhost:3000`
