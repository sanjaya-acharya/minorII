import React from 'react'
import { useDispatch } from 'react-redux'
import { clearCart } from '../features/cart/cartSlice'
import { closeModal } from '../features/modalSlice'

const Modal = () => {
    const dispatch = useDispatch()
    return (
        <div className="fixed flex flex-col justify-center flex-center items-center rounded-3xl border-gray-700 p-5 shadow-lg bg-indigo-300 top-60 left-52 z-10 shadow-indigo-500/40">
            <h1 className="text-3xl">
                Remove All Items From Your Shopping Cart?
            </h1>
            <div className="flex gap-20 text-2xl p-5">
                <button
                    onClick={() => {
                        dispatch(clearCart())
                        dispatch(closeModal())
                    }}
                >
                    CONFIRM
                </button>
                <button onClick={() => dispatch(closeModal())}>CANCEL</button>
            </div>
        </div>
    )
}

export default Modal
