import { ChevronLeftIcon, TrendingUpIcon } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "./login-form";
import { ImageCarousel } from "./ImageCarousel";

export const metadata = {
  title: "Login | Weetoo",
  description: "Login to your Weetoo account",
};

export default function Login() {
  return (
    <div className="h-screen p-5">
      <div className="border w-full h-full flex">
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="absolute top-5 left-5 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="w-5 h-5 text-[#e74c3c]" />
              <span className="text-xl font-bold ">
                <span className="text-[#e74c3c]">W</span>EE
                <span className="text-[#e74c3c]">T</span>OO
              </span>
            </div>
          </div>

          <div className="absolute top-5 right-5 text-sm">
            <Link
              href="/trading"
              className="flex items-center gap-1 hover:text-muted-foreground group"
            >
              <ChevronLeftIcon className="w-5 h-5 text-muted-foreground group-hover:-translate-x-1 transition-all duration-300" />
              <span>Back to Website</span>
            </Link>
          </div>
          <LoginForm />
        </div>
        <ImageCarousel />
      </div>
    </div>
  );
}
