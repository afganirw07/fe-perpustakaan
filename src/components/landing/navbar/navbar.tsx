import { Button } from "@/components/ui/button/Navbutton";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 h-17 bg-[hsl(0_0%_100%)] border-b border-[hsl(0_0%_96.1%)]">
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex">
            Masuk
          </Button>
          <Button className="xs:inline-flex bg-[#171717] text-white">Ayo Mulai</Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
