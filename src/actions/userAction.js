import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstant'
import axios from 'axios'

export const login =(email,password)=> async(dispatch) =>{
    try{
        dispatch({type:LOGIN_REQUEST})
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/login',{email,password},config)
        dispatch({type:LOGIN_SUCCESS,
        payload:data.user})

    }catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.errorMessage
        })
    }
}
export const register =(userData)=> async(dispatch) =>{
    try{
        dispatch({type:REGISTER_REQUEST})
        const config = {
            headers:{
                'Content-type':'multipart/form-data'
            }
        }
        const {data} = await axios.post('/api/v1/register',userData,config)
        dispatch({type:REGISTER_SUCCESS,
        payload:data.user})

    }catch(error){
        dispatch({
            type:REGISTER_FAIL,
            payload:error.response.data.message
        })
    }
}
export const loaduser =()=> async(dispatch) =>{
    try{
        dispatch({type:USER_REQUEST})
        const {data} = await axios.get('/api/v1/me')
        console.log(data)
        dispatch({type:USER_SUCCESS,
        payload:data.user})

    }catch(error){
        console.log(error.response)
        dispatch({
            type:USER_FAIL,
            payload:error.response.data.errorMessage
        })
    }
}
export const logout =()=> async(dispatch) =>{
    try{
         await axios.get('/api/v1/logout')
      
        dispatch({type:LOGOUT_SUCCESS})

    }catch(error){
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.errorMessage
        })
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS,
    })
}