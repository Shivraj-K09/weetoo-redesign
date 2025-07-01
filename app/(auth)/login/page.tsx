import { TrendingUpIcon } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "./login-form";
import { RightSide } from "./right-side";

export const metadata = {
  title: "Login | Weetoo",
  description: "Login to your Weetoo account",
};

export default function Login() {
  return (
    <div className="h-screen bg-background">
      <div className="w-full h-full flex">
        <div className="w-full h-full flex relative">
          <div className="absolute top-7 left-10 flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5" />
            <span className="text-xl font-semibold">Weetoo</span>
          </div>

          <div className="absolute top-7 right-10">
            <Link href="/trading">
              <span className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors duration-200 ease-in-out">
                Back to Website
              </span>
            </Link>
          </div>
          <LoginForm />
        </div>
        <RightSide />
      </div>
    </div>
  );
}
