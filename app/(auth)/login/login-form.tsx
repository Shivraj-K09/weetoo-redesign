import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function LoginForm() {
  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="flex flex-col w-full max-w-md gap-5">
        <div className="flex gap-0.5 flex-col select-none">
          <h3 className="text-[1.3rem] font-semibold">Welcome Back</h3>
          <p className="text-muted-foreground text-sm">
            Login to access your weetoo account and start trading
          </p>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mt-4">
            <button className="border w-full h-12 flex items-center justify-center rounded-lg cursor-pointer hover:bg-accent">
              <svg
                className="w-5 h-5 "
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
            </button>
            <button className="border w-full h-12 flex items-center justify-center rounded-lg bg-[#03C75A] cursor-pointer hover:bg-[#03B94D]">
              <svg
                role="img"
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Naver</title>
                <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" />
              </svg>
            </button>
            <button className="border w-full h-12 flex items-center justify-center rounded-lg bg-[#FFCD00] cursor-pointer hover:bg-[#FFB900]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 22"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0C5.37 0 0 4.21 0 9.4C0 12.65 2.19 15.53 5.56 17.12C5.31 18.05 4.69 20.29 4.56 20.89C4.4 21.61 4.82 21.6 5.13 21.39C5.36 21.22 8.07 19.38 9.35 18.51C10.21 18.67 11.09 18.76 12 18.76C18.63 18.76 24 14.55 24 9.4C24 4.21 18.63 0 12 0Z"
                  fill="#000000"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span
              className="w-full border-t border-gray-800"
              aria-hidden="true"
            ></span>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-primary">
              or continue with email
            </span>
          </div>
        </div>
      </div>

      <form className="space-y-4 w-full max-w-md mt-6">
        <div className="flex flex-col gap-1">
          <Input
            type="email"
            id="email"
            placeholder="Email address"
            className="h-12 bg-transparent"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            className="h-12 bg-transparent"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          <Link
            href="#"
            className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors duration-200 ease-in-out"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full h-12">
          Login
        </Button>
        <p className="text-sm text-muted-foreground text-center">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200 ease-in-out"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
