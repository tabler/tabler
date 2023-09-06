import React, { FC, ReactNode } from "react"

export interface AlertProps {
	children: ReactNode
}

export const Alert: FC<AlertProps> = ({ children }) => {
	return <div>{children}</div>
}
