import React, { FC, ReactNode, MouseEventHandler, AnchorHTMLAttributes } from "react"
import { clsx } from "../utils"

export interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	href?: string
	primary?: boolean
	disabled?: boolean
	size?: "xs" | "md" | "lg"
	onClick?: MouseEventHandler<HTMLAnchorElement>
	children?: ReactNode
	className?: string
}

export const Button: FC<ButtonProps> = ({ href, size, primary, children, disabled, className, ...props }) => {
	const btnClassName = clsx(
		"btn",
		{
			"btn-primary": primary,
			[`btn-${size}`]: !!size,
			disabled,
		},
		className,
	)

	return (
		<a className={btnClassName} href={href} {...props}>
			{children}
		</a>
	)
}
