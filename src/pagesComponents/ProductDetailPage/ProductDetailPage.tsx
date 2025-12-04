"use client";

import styles from "./ProductDetailPage.module.scss";
import { testArray } from "@/halpers/constants/indext";
import ProductDetailSecond from "./components/ProductDetailSecond";
import ProductDetailFirst from "./components/ProductDetailFirst";

interface ProductDetailPageProps {
    productId: string;
}

export default function ProductDetailPage({ productId }: ProductDetailPageProps) {
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
            <ProductDetailFirst />
            <div className="container">
                <ProductDetailSecond />
            </div>
        </div>
    );
}

