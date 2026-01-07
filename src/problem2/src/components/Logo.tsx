import logoImg from "@/assets/react.svg";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img src={logoImg} alt="MySwapApp Logo" className="h-8 w-8" />
      <span className="font-bold text-lg">My Currency Swapping App</span>
    </div>
  );
};