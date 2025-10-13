import { FC } from "react";
import { baseStyles, disabledStyles, variants } from "./ButtonStyles";

type ButtonTypes = {
  children?: React.ReactNode
  variant: "primary" | "submit" | "icon" | "text",
  onClick?: () => void,
  disabled?: boolean,
  className?: string
}

const Button: FC<ButtonTypes> = ({ variant, onClick, disabled, children, className }) => {
  const variantClasses = variants[variant]
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variantClasses} ${className ?? ''} ${disabled ? disabledStyles : ''} `}>
      {children}
    </button>
  )
}
export default Button;