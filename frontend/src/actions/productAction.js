import { 
    PRODUCT_LIST_FAIL ,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,

    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,

} from '../constents/productConstent'
import axios from 'axios'
export const Listproduct = () => async (dispatch) =>{
    try
    {
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await axios.get('/api/products/') 
        dispatch({
            type:PRODUCT_LIST_SUCCESS,
            payload:data
        })
    } catch (error)
    {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.response,

        })
    }
}

export const Detailsproduct = (id) => async (dispatch) =>{
    try
    {
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/products/${id}`) 
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error)
    {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.response,

        })
    }
}