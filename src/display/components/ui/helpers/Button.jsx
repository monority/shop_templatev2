
import React from "react";
import { Loader } from "../SvgStack";
const variants = {
	primary: "btn btn_base",
	secondary: "btn btn_secondary",
	outline: "btn btn_outline",
	danger: "btn btn_warning",
};

const sizes = {
	sm: "small",
	md: "medium",
	lg: "large",
};

export default function Button({
	variant = "primary",
	size = "md",
	isLoading = false,
	icon: Icon,
	children,
	className = "",
	...props
}) {
	return (
		<button
			className={`${variants[variant]} ${sizes[size]} ${className}`.trim()}
			disabled={isLoading}
			{...props}
		>
			{isLoading ? <Loader className="rotate" size="2rem" /> : Icon && <Icon size={16} />}
			{children}
		</button>
	);
}
