import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "danger" | "outline" | "success";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : ` bg-blue-950 ${
              className == "" ? "text-white" : className
            } px-6 hover:bg-blue-700 hover:cursor-pointer py-2 rounded `
      }`}
    >
      {label}
    </button>
  );
};

export default Button;
