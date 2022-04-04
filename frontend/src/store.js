import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productListReducer,productDetailsReducer} from './reducers/productReducer'
import {CartReducer} from './reducers/cartReducer'
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer} from './reducers/userReducer'
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: CartReducer,
    userLogin : userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
        JSON.parse(localStorage.getItem('cartItems')):[]

const userLoginFromStorage = localStorage.getItem('userInfo') ? 
        JSON.parse(localStorage.getItem('userInfo')):null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
        JSON.parse(localStorage.getItem('shippingAddress')):{}


const initialState = {
    cart:{
        cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFromStorage,},
    userLogin:{userInfo:userLoginFromStorage},
}
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store