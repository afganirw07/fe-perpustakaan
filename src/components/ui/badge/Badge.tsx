import React from "react";

type BadgeVariant = "light" | "solid";
type BadgeSize = "sm" | "md";
type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  color?: BadgeColor;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  variant = "light",
  color = "primary",
  size = "md",
  startIcon,
  endIcon,
  children,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-1 px-3 py-0.5 rounded-full font-medium transition-colors duration-200";

  const sizeStyles = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
  };

  const variants = {
    light: {
      primary: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
      success: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300",
      error: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300",
      warning: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300",
      info: "bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300",
      light: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
      dark: "bg-slate-700 text-white dark:bg-slate-600",
    },
    solid: {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      success: "bg-green-600 text-white hover:bg-green-700",
      error: "bg-red-600 text-white hover:bg-red-700",
      warning: "bg-yellow-500 text-white hover:bg-yellow-600",
      info: "bg-sky-500 text-white hover:bg-sky-600",
      light: "bg-gray-300 text-gray-800 hover:bg-gray-400",
      dark: "bg-slate-800 text-white hover:bg-slate-900",
    },
  };

  const sizeClass = sizeStyles[size];
  const colorClass = variants[variant][color];

  return (
    <span className={`${baseStyles} ${sizeClass} ${colorClass}`}>
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </span>
  );
};

export default Badge;
