import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_REQUEST,

    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_RESET,
} from '../constents/orderConstant'
import {CLEAR_CART_ITEM} from '../constents/cartConstant'
export const CreateOrder = (order) => async (dispatch,getState) =>{
    try
    {

        dispatch({type:ORDER_CREATE_REQUEST})
        const {userLogin:{userInfo},} = getState()
        const config = {
            headers : {
                'Accept': 'application/json',
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.post(`/api/orders/add/`,order,config) 
        dispatch({
            type:ORDER_CREATE_SUCCESS,
            payload:data
        })
        dispatch({
            type:CLEAR_CART_ITEM,
            payload:data
        })
        localStorage.removeItem('cartItems') 
        
    }catch(error)
    {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.response,

        })
    }
}


export const getDetailOrder = (id) => async (dispatch,getState) =>{
    try
    {

        dispatch({type:ORDER_DETAIL_REQUEST})
        const {userLogin:{userInfo},} = getState()
        const config = {
            headers : {
                'Accept': 'application/json',
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/orders/${id}/`,config) 
        dispatch({
            type:ORDER_DETAIL_SUCCESS,
            payload:data
        })
        
    }catch(error)
    {
        dispatch({
            type:ORDER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.response,

        })
    }
}

export const getPayOrder = (id,paymentresult) => async (dispatch,getState) =>{
    try
    {

        dispatch({type:ORDER_PAY_REQUEST})
        const {userLogin:{userInfo},} = getState()
        const config = {
            headers : {
                'Accept': 'application/json',
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/orders/${id}/pay/`,paymentresult,config) 
        dispatch({
            type:ORDER_PAY_SUCCESS,
            payload:data
        })
        
    }catch(error)
    {
        dispatch({
            type:ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.response,

        })
    }
}