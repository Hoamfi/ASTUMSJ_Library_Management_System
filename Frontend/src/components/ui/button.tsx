import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary" | "destructive";
};

export const Button: React.FC<ButtonProps> = ({ children, variant = "default", ...props }) => {
  let className = "px-4 py-2 rounded font-semibold ";

  if (variant === "secondary") className += "bg-gray-200 text-black";
  else if (variant === "destructive") className += "bg-red-500 text-white";
  else className += "bg-blue-500 text-white";

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
