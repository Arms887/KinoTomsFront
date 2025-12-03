import * as React from "react"
import styles from "./ticketCard.module.scss"
import img from "./../../../public/assets/img/image 28.png"
import Image from "next/image"
import { PinkButton } from "../ui/pinkButton"

function TicketCard({
}) {

    return (
        <div className={styles.ticketCardMainBlock}>
            <div className={styles.ticketCardContent}>
                <div className={styles.ticketCardTop}>
                    <div className={styles.ticketCardTopImg}>
                        <Image src={img} alt="" />
                    </div>
                    <div className={styles.ticketCardTopLeft}>
                        <p className={styles.ticketCardTopLeftDay}>1</p>
                        <div className={styles.ticketCardTopLeftTime}><span>Դեկ</span>
                            <p>Կիրակի</p></div>
                    </div>
                </div>
                <div className={styles.ticketCardCenter}>
                    <div className={styles.ticketCardCenterContent}>
                    {[...Array(4)].map((_, i) => (
                        <div className={styles.ticketCardCenterTime}>
                            <p>12:30</p>
                        </div>
                    ))}
                    </div>
                </div>
                <div className={styles.ticketCardBottom}>
                    <PinkButton>Գնել Տոմս</PinkButton>
                </div>
            </div>
        </div>
    )
}

export { TicketCard }
