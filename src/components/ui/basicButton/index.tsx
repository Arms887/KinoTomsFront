import * as React from "react"
import styles from "./basicButton.module.scss"

interface BasicButtonProps {
    padding?: string | number;
    children?: React.ReactNode;
    [key: string]: any;
}

function BasicButton({ padding, children, ...props }: BasicButtonProps) {
    const paddingStyle = padding 
        ? typeof padding === 'number' 
            ? `${padding}px` 
            : padding
        : undefined;

    return (
        <button 
            className={styles.basicButton} 
            style={paddingStyle ? { padding: paddingStyle } : undefined}
            {...props}
        >
            {children}
        </button>
    )
}

export { BasicButton }
