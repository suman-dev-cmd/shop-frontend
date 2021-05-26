import axios from 'axios';
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstant'

export const getProduct = (keyword='',price,category,rating=0) => async(dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST})
        let link = `/api/v1/product?keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&rating[gte]=${rating}`;
        if(category){
            link = `/api/v1/product?keyword=${keyword}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&rating[gte]=${rating}`;
        }
        const {data} = await axios.get(link);
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data
        })
    }catch(err){
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:err.response.data.message
        })

    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS,
    })
}

export const getProductDetails = (id) => async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/v1/product/${id}`)
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data.product
        })
    }catch(err){
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:err.response.data.message
        })

    }
}