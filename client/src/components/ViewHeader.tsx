import { cn } from "@/lib/utils";

interface ViewHeaderProps {
  title: string;
  subtitle?: string;
  colorClass: string;
}

export default function ViewHeader({ title, subtitle, colorClass }: ViewHeaderProps) {
  return (
    <div className={cn("px-6 py-4", colorClass)}>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {subtitle && (
        <p className="text-sm text-white/90 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
