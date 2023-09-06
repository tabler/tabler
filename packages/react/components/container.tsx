import clsx from "clsx"
import React, { FC, ReactNode, ReactElement } from "react"

export interface ContainerProps {
	children: ReactNode | ReactElement
	size?: "narrow"
	className?: string
}

export const Container: FC<ContainerProps> = ({ children, size, className }) => {
	return <div className={clsx("container", {
		[`container-${size}`]: !!size,
	}, className)}>{children}</div>
}
