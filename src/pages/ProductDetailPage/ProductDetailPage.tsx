"use client";

import { useTranslations } from "next-intl";
import styles from "./ProductDetailPage.module.scss";
import Image from "next/image";
import { PinkButton } from "@/components/ui/pinkButton";
import { testArray } from "@/halpers/constants/indext";
import ProductDetailSecond from "./components/ProductDetailSecond";

interface ProductDetailPageProps {
    productId: string;
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
    const t = useTranslations("ProductDetail");
    const product = testArray.find(item => item.id === Number(productId));

    if (!product) {
        return (
            <div className={styles.productDetailContainer}>
                <div className="container">
                    <h1>Product not found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.productDetailContainer}>
            <div className="container">
                <ProductDetailSecond />
            </div>
        </div>
    );
}

