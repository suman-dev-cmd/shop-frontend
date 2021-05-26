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
export const authReducer = (state={user:{}},action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case USER_REQUEST:
            return {
                loading:true,
                isAuthenticated:false
            }
        case LOGIN_SUCCESS:
        case USER_SUCCESS:
            console.log(action.payload)
            return {
                loading:false,
                isAuthenticated:true,
                user:action.payload
            }
        case REGISTER_SUCCESS:
            return{
                loading:false,
                isRegister:true
            }
        case LOGOUT_SUCCESS:
            return{
                loading:false,
                isAuthenticated:false,
                isRegister:false,
            }
        case USER_FAIL:
            return{
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }  
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            console.log(action.payload)
            return {
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                error:action.payload
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error:null
            }
        default:
            return state
    }
}

