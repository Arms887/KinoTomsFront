import * as React from "react"
import { cn } from "@/lib/utils"
import styles from "./button.module.scss"

interface ButtonProps extends React.ComponentProps<"button"> {
  width?: string | number
  height?: string | number
}

function Button({
  className,
  width,
  height,
  style,
  ...props
}: ButtonProps) {
  const buttonStyle: React.CSSProperties = {
    ...style,
    ...(width && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height && { height: typeof height === "number" ? `${height}px` : height }),
  }

  return (
    <button
      className={cn(styles.button, className)}
      style={buttonStyle}
      {...props}
    />
  )
}

export { Button }
