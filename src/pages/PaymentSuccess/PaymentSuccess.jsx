import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import styles from './PaymentSuccess.module.css'

export default function PaymentSuccess() {
  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.icon}>✦</div>
        <h1 className={styles.title}>Payment Successful</h1>
        <p className={styles.sub}>
          Thank you for choosing Our Forever. We'll be in touch shortly to begin
          crafting your invitation.
        </p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
      <Footer />
    </div>
  )
}
