"use client"

import { useState } from "react"
import { PinkButton } from "../ui/pinkButton"
import styles from "./product.module.scss"
import Image, { StaticImageData } from "next/image"

import TicketPurchaseModal from "../TicketPurchaseModal/TicketPurchaseModal"
import { useRouter } from "next/navigation"

interface ProductCardProps {
    img?: StaticImageData | string
    time?: string
    title?: string
    className?: string
    id?: string | number
    version?: 1 | 2
}

function ProductCard({ img, time, title, className, id, version = 1 }: ProductCardProps) {
    const router = useRouter()

    const handleClickToPage = () => {
        if (!id) return
        router.push(`/product/${id}`)
    }

    return (
        <>
            <div
                onClick={handleClickToPage}
                className={`${className ?? ""} ${styles.productCardContainer}`}
            >
                <Image
                    className={styles.productCardMainImg}
                    src={img as StaticImageData}
                    alt=""
                />

                <div className={styles.productCardHidedContent}>
                    <Image
                        className={styles.productCardHidedImg}
                        src={img as StaticImageData}
                        alt=""
                    />

                    <div className={`${styles.productCardContent} ${version === 1 ? styles.productCardContentVersion1 : styles.productCardContentVersion2}`}>
                        <div className={styles.productCardContentTime}>
                            <p className={styles.productCardContentTime}>{time}</p>
                            <p className={styles.productCardContentTimeTitle}>{title}</p>

                            <div className={styles.productCardGet}>
                                {
                                    version === 1 ? (
                                        <PinkButton>
                                            <span>Get Ticket</span>
                                        </PinkButton>
                                    ) : (
                                        <p className={styles.productCardVersion2Text}>See more in our projects</p>
                                    )
                                }

                                <div className={styles.productCardisActiv}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { ProductCard }
