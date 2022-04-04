import { 
    USER_LOGIN_FAIL ,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,

    USER_LOGOUT,
    
    USER_REGISTER_FAIL ,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,

    USER_DETAILS_FAIL ,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_RESET,
    USER_UPDATE_PROFILE_SUCCESS

} from '../constents/userConstant'

import axios from 'axios'

export const Login = (email,password) => async (dispatch) =>{
    try
    {

        dispatch({type:USER_LOGIN_REQUEST})
        const config = {
            headers : {
                'Accept': 'application/json',
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post('/api/users/login/',{'username':email,'password':password},config) 
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))
        
    }catch(error)
    {
        dispatch({
            type:USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.response,

        })
    }
}

export const logout = () => (dispatch)=>{
    dispatch({type:USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
    localStorage.removeItem('userInfo')
}


export const Register = (name,email,password) => async (dispatch) =>{
    try
    {

        dispatch({type:USER_REGISTER_REQUEST})
        const config = {
            headers : {
                'Accept': 'application/json',
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post('/api/users/register/',{'name':name,'email':email,'password':password},config) 
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo',JSON.stringify(data))
        
    }catch(error)
    {
        dispatch({
            type:USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.response,

        })
    }
}



export const getUserDetails = (id) => async (dispatch,getState) =>{
    try
    {

        dispatch({type:USER_DETAILS_REQUEST})
        const {userLogin:{userInfo},} = getState()
        const config = {
            headers : {
                'Accept': 'application/json',
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/users/${id}/`,config) 
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })
        
        
    }catch(error)
    {
        dispatch({
            type:USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.response,

        })
    }
}


export const UserUpdateProfile = (user) => async (dispatch,getState) =>{
    try
    {

        dispatch({type:USER_UPDATE_PROFILE_REQUEST})
        const {userLogin:{userInfo},} = getState()
        const config = {
            headers : {
                'Accept': 'application/json',
                'Content-type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.put(`/api/users/profile/update/`,user,config) 
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })        
        localStorage.setItem('userInfo',JSON.stringify(data))

    }catch(error)
    {
        dispatch({
            type:USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.response,

        })
    }
}