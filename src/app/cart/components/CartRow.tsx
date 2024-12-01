import Image from 'next/image'
import styles from './styles/CartRow.module.css'

import trash from "@/assets/trash-can.png"

interface CartItems {
    id: number;
    name: string;
    details: string;
    image: string;
    price: number;
    quantity: number;
}

interface CartRowProps {
    cartItems: CartItems[];
}

export default function CartRow({ cartItems }: CartRowProps) {
    return (
        <div className={styles.cartRows}>
            {cartItems.map((item) => (
                <div key={item.id} className={styles.cartRow}>
                    <div className={styles.firstColumn}>
                        <Image src={item.image} alt='product image' width={80} height={80} />
                    </div>
                    <div className={styles.itemName}>
                        <h3>{item.name}</h3>
                        <p>{item.details}</p>
                    </div>
                    <div className={styles.itemQuantity}>
                        <button>-</button>
                        {item.quantity}
                        <button>+</button>
                    </div>
                    <div className={styles.itemPrice}>${item.quantity * item.price}</div>
                    <div className={styles.trash}>
                        <Image src={trash} width={25} height={25} alt='trash' />
                    </div>
                </div>
            ))}
        </div>
    )
}
