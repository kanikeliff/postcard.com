import { cn } from "../../lib/utils";

export default function Button({ children, className = "", variant = "primary", ...props }) {
  const variants = {
    primary: "bg-amber-500 text-white hover:bg-amber-600 shadow-md shadow-amber-200",
    secondary: "bg-white text-stone-800 border border-stone-200 hover:bg-stone-50",
    ghost: "bg-transparent text-stone-700 hover:bg-stone-100",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}