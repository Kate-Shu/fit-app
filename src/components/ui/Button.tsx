import { FC } from "react";

type ButtonTypes = {
 children?: React.ReactNode
 type?: 'button' | 'submit',
 variant: "primary" | "submit",
 onClick?: () => void,
 disabled?: boolean,
 gradientDirection: "left" | "right" | "bottom",
}

const variants = {
 primary: "relative inline-block py-2 px-4 w-70 rounded-4xl text-text-main border-gradient",
 submit: "w-10 h10 rounded-full bg-bg-secondary color-text-main"
}
const gradientDirections = {
 left: "gradient-direction-left",
 right: "gradient-direction-right",
 bottom: "gradient-direction-bottom"
}
const baseStyles = 'inline-flex justify-center items-center'

const Button: FC<ButtonTypes> = ({ type, variant, onClick, disabled, children, gradientDirection }) => {
 return (
  <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${gradientDirections[gradientDirection]}`}>
   {children}
  </button>
 )
}
export default Button;
