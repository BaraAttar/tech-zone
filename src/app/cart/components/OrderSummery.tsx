import styles from './styles/OrderSummary.module.css'

export default function OrderSummary() {
    return (
        <div className={styles.orderSummaryContainer}>

            <div className={styles.summaryDetails}>
                <h1>Summary</h1>
                <div className={styles.summaryItems}>
                    <div className={styles.summaryRows}>
                        <div className={styles.summaryRow}>
                            <p>Sub Total</p>
                            <p>$200</p>
                        </div>
                        <div className={styles.summaryRow}>
                            <p>Shipping</p>
                            <p>$100</p>
                        </div>
                        <div className={styles.summaryRow}>
                            <p>Tax</p>
                            <p>$20</p>
                        </div>
                    </div>
                    <div className={styles.breakLine}></div>
                    <div className={styles.totalRow}>
                        <p>Total</p>
                        <p>$1000</p>
                    </div>
                </div>
            </div>

            <button className={styles.checkoutButton}>CHECKOUT</button>
        </div>
    )
}
