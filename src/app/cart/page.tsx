import styles from './page.module.css'
import CartList from './components/CartList'
import OrderSummary from './components/OrderSummery'

export default function page() {
  return (
    <div className={styles.cartPage}>  
      <CartList/>
      <OrderSummary/>
    </div>
  )
}
