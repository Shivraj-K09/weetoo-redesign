import Link from "next/link";
import { Menu } from "./menu";
import { ThemeToggle } from "./theme-toggle";
import { UserDropdown } from "./user/user-dropdown";

export function Header() {
  return (
    <header className="w-full border-dashed border-border border-b sticky top-0 z-50 bg-background">
      <div className="h-14 flex justify-between w-full items-center container mx-auto gap-2 md:gap-4">
        <Link href="/">
          <span className="font-semibold text-xl">WEETOO</span>
          {/* <span className="text-xs">We Trade, Weetoo</span> */}
        </Link>

        <Menu />

        <div className="flex items-center gap-2">
          {/* <Button variant="outline" className="cursor-pointer shadow-none h-10">
            Login/Register
          </Button> */}

          <ThemeToggle />
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
