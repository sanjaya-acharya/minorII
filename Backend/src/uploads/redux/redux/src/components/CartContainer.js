import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItems from './CartItems'
import { totalAmount } from '../features/cart/cartSlice'
import { closeModal, openModal } from '../features/modalSlice'

const CartContainer = () => {
    const { cartItems, total, amount } = useSelector(store => store.cart)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(totalAmount())
    }, [cartItems])

    if (amount < 1) {
        return (
            <section className="font-serif text-center m-20 p-10">
                <h1 className="text-6xl p-5 font-medium tracking-wide">
                    YOUR BAG
                </h1>
                <p className="text-2xl text-slate-700">is currently empty</p>
            </section>
        )
    }

    return (
        <section className="p-8">
            <div onClick={() => dispatch(closeModal())}>
                <header>
                    <h2 className="text-3xl font-medium tracking-wide font-sans">
                        YOUR BAG
                    </h2>
                </header>
                <div className="mx-auto">
                    {cartItems.map(item => (
                        <CartItems key={item.id} {...item} />
                    ))}
                </div>
                <div className="flex justify-between text-2xl p-3 font-sans m-1">
                    <h1>Total</h1>
                    <h1>$ {total.toFixed(2)}</h1>
                </div>
            </div>
            <div className="font-sans text-center m-3 text-2xl font-medium">
                <button
                    className="border-2 border-rose-400 rounded-2xl p-3 w-60 text-red-500"
                    onClick={() => dispatch(openModal())}
                >
                    CLEAR CART
                </button>
            </div>
        </section>
    )
}

export default CartContainer
