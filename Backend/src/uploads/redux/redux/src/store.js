import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import modalReducer from './features/modalSlice'

const combineReducer = combineReducers({
    cart: cartReducer,
    modal: modalReducer,
})
export const store = configureStore({
    reducer: combineReducer,
})
