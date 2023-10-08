import React from 'react'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { removeItem, increase, decrease } from '../features/cart/cartSlice'

const CartItems = ({ id, img, title, price, amount }) => {
    const dispatch = useDispatch()
    return (
        <div>
            <div className="p-4 py-6 flex justify-between">
                <article className="flex gap-10">
                    <figure>
                        <img src={img} alt={title} className="h-20" />
                    </figure>
                    <div>
                        <h1 className="font-medium font-sans pb-1 text-2xl">
                            {title.toUpperCase()}
                        </h1>
                        <p>$ {price}</p>
                        <button
                            className="text-blue-500"
                            onClick={() => dispatch(removeItem(id))}
                        >
                            remove
                        </button>
                    </div>
                </article>
                <div className="text-2xl px-2">
                    <button onClick={() => dispatch(increase(id))}>
                        <AiOutlineUp />
                    </button>
                    <p className="px-1">{amount}</p>
                    <button
                        onClick={() => {
                            if (amount === 1) {
                                dispatch(removeItem(id))
                                return
                            }
                            dispatch(decrease(id))
                        }}
                    >
                        <AiOutlineDown />
                    </button>
                </div>
            </div>
            <hr />
        </div>
    )
}

export default CartItems
