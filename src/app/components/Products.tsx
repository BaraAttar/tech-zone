import React, { useEffect } from 'react'
import styles from "./styles/Products.module.css"
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { getProducts } from '@/redux/slices/products/products.AsyncThunk';

// const list = [
//     { id: 1, name: "iPhone 16 Pro Max", price: 1999, image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730504384/products/pixel-9-pro.jpg" },
//     { id: 2, name: "Galaxy S24 Ultra 16 Pro Max", price: 1299, image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730504384/products/pixel-9-pro.jpg" },
//     { id: 3, name: "iPhone 15 Pro", price: 1499, image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730504384/products/pixel-9-pro.jpg" },
//     { id: 4, name: "Samsung Galaxy Z Fold 5", price: 179, image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730504384/products/pixel-9-pro.jpg" },
//     { id: 5, name: "Google Pixel 8 Pro", price: 999, image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730504384/products/pixel-9-pro.jpg" },
//     { id: 6, name: "OnePlus 11", price: 899, image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730504384/products/pixel-9-pro.jpg" },
//     { id: 7, name: "Xiaomi 13 Pro", price: 1199, image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730504384/products/pixel-9-pro.jpg" },
//     { id: 8, name: "Sony Xperia 1 IV", price: 1399, image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730504384/products/pixel-9-pro.jpg" }
// ];

import cartIcon from "@/assets/cart.svg";
import heartIcon from "@/assets/heart.svg";


export default function Products() {
    const dispatch = useDispatch<AppDispatch>();
    const { products } = useSelector((state: RootState) => state.product);

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <div className={styles.productsContainer}>
            <h1>
                Explore Our Products
            </h1>
            <div className={styles.productsList}>
                {products.products.map((product) => (
                    <div className={styles.product} key={product._id}>
                        <div className={styles.imageContainer}>
                            <Image className={styles.image} alt='image' width={200} height={200} src={product.image} priority />
                            <Image className={styles.favorites} alt='favorites' src={heartIcon} height={35} width={35} />
                            <Image className={styles.addToCart} alt='addToCart' src={cartIcon} height={35} width={35} />
                        </div>
                        <p className={styles.productName}>{product.name}</p>
                        <p className={styles.price}>{product.price}$</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
