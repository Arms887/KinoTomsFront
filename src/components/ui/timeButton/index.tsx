import * as React from "react"
import styles from "./timeButton.module.scss"

interface ButtonProps extends React.ComponentProps<"button"> {
    month?: string | number
    day?: string | number
}

function TimeButton({
    month,
    day,
}: ButtonProps) {

    return (
        <button className={styles.timeButton}><div><p>{month} {day}</p></div></button>
    )
}

export { TimeButton }
