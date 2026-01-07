import { Logo } from "@/components/Logo";
import { ModeToggle } from "@/components/ModeToggle";

export const Header = () => {
  return (
    <header className="w-full py-6 px-6 bg-card text-card-foreground flex items-center justify-between shadow-md">
      <Logo />
      <ModeToggle />
    </header>
  );
};