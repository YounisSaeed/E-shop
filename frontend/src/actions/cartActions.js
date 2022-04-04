import axios from 'axios'
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from '../constents/cartConstant'

export const addToCart = (id,qty) => async (dispatch,getState) => {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countinStock:data.countinStock,
            qty:qty
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const RemoveFromCart = (id) => (dispatch,getState)=>{
    dispatch({
        type:REMOVE_FROM_CART,
        payload:id,
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

export const SaveShippingAddress = (data) => (dispatch)=>{
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data,
    })
    localStorage.setItem('ShippingAddress',JSON.stringify(data))
}

export const SavePaymentMethod = (data) => (dispatch)=>{
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data,
    })
    localStorage.setItem('PaymentMethod',JSON.stringify(data))
}