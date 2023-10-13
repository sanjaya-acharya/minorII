import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
    amount: 1,
    total: 0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(
                'https://course-api.com/react-useReducer-cart-project'
            )
            const data = await response.json()
            return data
        } catch (error) {
            thunkAPI.rejectWithValue('There was an error')
        }
    }
)
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: state => {
            state.cartItems = []
        },
        removeItem: (state, action) => {
            const id = action.payload
            state.cartItems = state.cartItems.filter(item => item.id !== id)
        },
        increase: (state, action) => {
            const id = action.payload
            const item = state.cartItems.find(i => i.id === id)
            item.amount++
        },
        decrease: (state, action) => {
            const id = action.payload
            const item = state.cartItems.find(i => i.id === id)
            item.amount--
        },
        totalAmount: state => {
            let total = 0
            let amount = 0
            state.cartItems.forEach(item => {
                amount += item.amount
                total += item.amount * item.price
            })
            state.total = total
            state.amount = amount
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getCartItems.pending, state => {
                state.isLoading = true
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartItems = action.payload
            })
            .addCase(getCartItems.rejected, state => {
                state.isLoading = true
            })
    },
})

export const { clearCart, removeItem, increase, decrease, totalAmount } =
    cartSlice.actions

export default cartSlice.reducer
