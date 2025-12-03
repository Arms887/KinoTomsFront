"use client"

import { PinkButton } from "../ui/pinkButton"
import styles from "./product.module.scss"
import Image, { StaticImageData } from "next/image"
import { useRouter } from "next/navigation"

interface ProductCardProps {
    img?: StaticImageData | string
    time?: string
    title?: string
    className?: string
    id?: string | number
}

function ProductCard({ img, time, title, className, id }: ProductCardProps) {
    const router = useRouter()

    const handleClickToPage = () => {
        if (!id) return
        router.push(`/product/${id}`)
    }

    return (
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

                <div className={styles.productCardContent}>
                    <div className={styles.productCardContentTime}>
                        <p className={styles.productCardContentTime}>{time}</p>
                        <p className={styles.productCardContentTimeTitle}>{title}</p>

                        <div className={styles.productCardGet}>
                            <PinkButton>
                                <span>Get Ticket</span>
                            </PinkButton>

                            <div className={styles.productCardisActiv}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { ProductCard }
