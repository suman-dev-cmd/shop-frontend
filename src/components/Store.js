import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productReducers,productDetailsReducers} from '../reducers/productReducers'
import {authReducer} from '../reducers/userReducers'
import { cartReducer } from '../reducers/cartReducers'
import {newOrderReducer} from '../reducers/orderReducers'
const reducer = combineReducers({
    products:productReducers,
    productDetails:productDetailsReducers,
    auth:authReducer,
    cart: cartReducer,
    newOrder:newOrderReducer
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
};

const middlware = [thunk];

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middlware)));

export default store;