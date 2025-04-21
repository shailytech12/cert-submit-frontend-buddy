
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <div className="h-8 w-8 rounded-full bg-maroon-700 flex items-center justify-center text-white font-bold mr-2">
        CS
      </div>
      <span className="font-bold text-xl text-maroon-800">CertSubmit</span>
    </div>
  );
}
