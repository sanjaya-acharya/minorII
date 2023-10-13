import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartContainer from './components/CartContainer'
import Modal from './components/Modal'
import Navbar from './components/Navbar'
import { getCartItems } from './features/cart/cartSlice'
import './index.css'

const App = () => {
    const { isOpen } = useSelector(state => state.modal)
    const { isLoading } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    useEffect(() => {
        /* eslint-disable */
        dispatch(getCartItems())
    }, [])

    if (isLoading) {
        return (
            <figure className="flex justify-center items-center min-h-screen">
                <img
                    src="https://media0.giphy.com/media/5kq0GCjHA8Rwc/giphy.gif?cid=ecf05e47byjqymt60djtn7taeuyplpiv2mmr5cmir70dlt2y&rid=giphy.gif&ct=g"
                    alt="NEVER GONNA LET YOUR DOWM"
                />
            </figure>
        )
    }

    return (
        <div>
            <main className="min-h-screen">
                {isOpen && <Modal />}
                <Navbar />
                <CartContainer />
            </main>
        </div>
    )
}

export default App
