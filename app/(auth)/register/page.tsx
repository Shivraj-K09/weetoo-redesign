import { TrendingUpIcon } from "lucide-react";
import Link from "next/link";
import { RightSide } from "@/components/right-side";
import { RegisterForm } from "./register-form";

export const metadata = {
  title: "Register | Weetoo",
  description:
    "Register to Weetoo to start trading cryptocurrencies, stocks, and forex.",
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
          <RegisterForm />
        </div>
        <RightSide />
      </div>
    </div>
  );
}
