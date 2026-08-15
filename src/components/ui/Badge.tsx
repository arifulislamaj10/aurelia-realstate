import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sale" | "rent" | "pending" | "sold" | "glass";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-primary/8 text-primary border border-primary/10",
    sale: "bg-success/10 text-success border border-success/20",
    rent: "bg-accent/15 text-accent border border-accent/25",
    pending: "bg-amber-50 text-amber-800 border border-amber-200/60",
    sold: "bg-gray-100 text-gray-600 border border-gray-200",
    glass: "glass text-foreground-light border-border-light backdrop-blur-md",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
