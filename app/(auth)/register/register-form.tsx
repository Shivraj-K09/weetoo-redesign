"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 256 262"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
  >
    <path
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      fill="#4285F4"
    />
    <path
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      fill="#34A853"
    />
    <path
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      fill="#FBBC05"
    />
    <path
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      fill="#EB4335"
    />
  </svg>
);
const KakaoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" fill="#391B1B" />
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="#FFCD00"
      style={{ mixBlendMode: "multiply" }}
    />
  </svg>
);
const NaverIcon = () => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
  >
    <title>Naver</title>
    <path
      d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z"
      fill="#fff"
    />
  </svg>
);

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  return (
    <form className="max-w-[550px] w-full mx-auto border border-border bg-card p-8 flex flex-col gap-6 rounded-none">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-center rounded-none">
          Create your account
        </h2>
        <div className="text-center text-base mt-1">
          Sign up to start your WEETOO journey.
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="First name"
            className="rounded-none h-10"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Last name"
            className="rounded-none h-10"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="nickname">Nickname</Label>
          <Input
            id="nickname"
            type="text"
            placeholder="Nickname"
            className="rounded-none h-10"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="rounded-none h-10"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="rounded-none pr-10 h-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground bg-transparent border-none p-0 m-0 cursor-pointer rounded-none border-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="rounded-none pr-10 h-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground bg-transparent border-none p-0 m-0 cursor-pointer rounded-none border-none"
              tabIndex={-1}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Checkbox
          id="agree"
          checked={agree}
          onCheckedChange={(checked) => setAgree(checked === true)}
          className="rounded-none"
        />
        <Label htmlFor="agree" className="text-sm">
          I agree to the{" "}
          <a href="#" className="text-blue-400 font-semibold">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-400 font-semibold">
            Privacy Policy
          </a>
        </Label>
      </div>
      <Button type="submit" className="rounded-none border-none w-full h-10">
        Create Account
      </Button>
      <div className="flex items-center gap-2 my-2">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">or continue with</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="grid grid-cols-3 gap-2 w-full mt-2">
        <Button
          type="button"
          className="rounded-none border-none w-full flex items-center justify-center gap-2 h-10 transition-colors"
          style={{
            background: "#fff",
            color: "#222",
            border: "1px solid var(--border)",
          }}
          variant="outline"
          aria-label="Register with Google"
          onMouseOver={(e) => (e.currentTarget.style.background = "#f3f4f6")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#fff")}
        >
          <GoogleIcon />
        </Button>
        <Button
          type="button"
          className="rounded-none border-none w-full flex items-center justify-center gap-2 h-10 transition-colors"
          style={{
            background: "#FFCD00",
            color: "#391B1B",
            border: "1px solid var(--border)",
          }}
          variant="outline"
          aria-label="Register with Kakao"
          onMouseOver={(e) => (e.currentTarget.style.background = "#e6b800")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#FFCD00")}
        >
          <KakaoIcon />
        </Button>
        <Button
          type="button"
          className="rounded-none border-none w-full flex items-center justify-center gap-2 h-10 transition-colors"
          style={{
            background: "#03C75A",
            color: "#fff",
            border: "1px solid var(--border)",
          }}
          variant="outline"
          aria-label="Register with Naver"
          onMouseOver={(e) => (e.currentTarget.style.background = "#029e46")}
          onMouseOut={(e) => (e.currentTarget.style.background = "#03C75A")}
        >
          <NaverIcon />
        </Button>
      </div>
      <div className="flex items-center justify-center gap-1 text-sm">
        <span className="text-muted-foreground">Already have an account?</span>
        <Link href="/login" className="text-blue-400 font-semibold">
          Login
        </Link>
      </div>
    </form>
  );
}
