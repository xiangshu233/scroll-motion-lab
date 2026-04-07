import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackHomeButton() {
  return (
    <div className="fixed top-4 left-4 z-[100]">
      <Link
        href="/"
        className="flex items-center gap-2 text-white bg-black/50 hover:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        返回首页
      </Link>
    </div>
  );
}
