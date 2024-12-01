import styles from './styles/CartList.module.css'
import CartRow from './CartRow'

interface CartItems {
    id: number;
    name: string;
    details: string;
    image: string;
    price: number;
    quantity: number;
}

const cartItems: CartItems[] = [
    { id: 1, name: "ipahone 16", details: "265GB Black", image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730406982/products/funflower.jpg", price: 999, quantity: 2 },
    { id: 2, name: "ipahone 16 pro max", details: "512GB Black", image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730406982/products/funflower.jpg", price: 19, quantity: 1 },
    { id: 3, name: "ipahone 16 pro", details: "265GB Black", image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730406982/products/funflower.jpg", price: 1290, quantity: 1 },
    { id: 4, name: "ipahone 16 pro", details: "265GB Black", image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730406982/products/funflower.jpg", price: 1299, quantity: 1 },
    { id: 5, name: "ipahone 16 pro", details: "265GB Black", image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730406982/products/funflower.jpg", price: 1299, quantity: 1 },
    { id: 6, name: "ipahone 16 pro", details: "265GB Black", image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730406982/products/funflower.jpg", price: 1299, quantity: 1 },
    { id: 7, name: "ipahone 16 pro", details: "265GB Black", image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730406982/products/funflower.jpg", price: 1299, quantity: 1 },
    { id: 8, name: "ipahone 16 pro", details: "265GB Black", image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730406982/products/funflower.jpg", price: 1299, quantity: 1 },
    { id: 9, name: "ipahone 16 pro", details: "265GB Black", image: "https://res.cloudinary.com/dkvauszbh/image/upload/v1730406982/products/funflower.jpg", price: 120, quantity: 1 }
]

export default function CartList() {
    return (
        <div className={styles.cartCard}>
            <h1>Shopping Cart</h1>

            <div className={styles.cartList}>
                <CartRow cartItems={cartItems} />
            </div>
        </div>
    )
}
