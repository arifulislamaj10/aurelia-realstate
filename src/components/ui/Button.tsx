import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-primary text-foreground-light hover:bg-primary-soft shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5",
    secondary:
      "bg-accent text-primary hover:bg-accent-light shadow-lg shadow-accent/25 hover:shadow-xl hover:-translate-y-0.5",
    outline:
      "border border-primary/20 text-primary hover:bg-primary hover:text-foreground-light hover:border-primary",
    ghost: "text-primary hover:bg-primary/5",
    glass:
      "glass text-foreground-light border-border-light hover:bg-white/15 hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs uppercase tracking-widest",
    md: "px-7 py-3.5 text-sm",
    lg: "px-9 py-4 text-base",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
