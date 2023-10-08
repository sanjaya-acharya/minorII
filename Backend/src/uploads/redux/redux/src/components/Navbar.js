import React from 'react'
import { useSelector } from 'react-redux'
import { AiOutlineShopping } from 'react-icons/ai'

const Navbar = () => {
    const { amount } = useSelector(store => store.cart)
    return (
        <div className="flex font-sans justify-between p-8 bg-purple-500 text-slate-100">
            <h3 className="text-2xl font-bold">Redux Toolkit</h3>
            <div className="relative cursor-pointer">
                <AiOutlineShopping style={{ fontSize: '2rem' }} />
                <div className="absolute -top-4 right-0">
                    {amount > 0 ? (
                        <p className="text-2xl text-white font-medium">
                            {amount}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
