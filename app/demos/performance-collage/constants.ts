export type PerformanceImage = {
  id: string;
  src: string;
};

export type PerformanceImagePosition = {
  id: string;
  left?: number;
  right?: number;
  bottom?: number;
};

export const performanceImages: PerformanceImage[] = [
  { id: "p1", src: "/demos/performance/performance1.png" },
  { id: "p2", src: "/demos/performance/performance2.png" },
  { id: "p3", src: "/demos/performance/performance3.png" },
  { id: "p4", src: "/demos/performance/performance4.png" },
  { id: "p5", src: "/demos/performance/performance5.jpg" },
  { id: "p6", src: "/demos/performance/performance6.png" },
  { id: "p7", src: "/demos/performance/performance7.png" },
];

export const performanceImgPositions: PerformanceImagePosition[] = [
  { id: "p1", left: 5, bottom: 65 },
  { id: "p2", right: 10, bottom: 60 },
  { id: "p3", right: -5, bottom: 45 },
  { id: "p4", right: -10, bottom: 0 },
  { id: "p5", left: 20, bottom: 50 },
  { id: "p6", left: 2, bottom: 30 },
  { id: "p7", left: -5, bottom: 0 },
];
