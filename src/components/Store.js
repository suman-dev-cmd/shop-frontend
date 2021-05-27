import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productReducers,productDetailsReducers,newReviewReducer,newProductReducer,productReducer,productReviewsReducer, reviewReducer} from '../reducers/productReducers'
import {authReducer,allUserReducer,userReducer, forgotPasswordReducer,userDetailsReducer} from '../reducers/userReducers'
import { cartReducer } from '../reducers/cartReducers'
import {newOrderReducer,myOrdersReducer,orderDetailsReducer,allOrdersReducer,orderReducer } from '../reducers/orderReducers'
const reducer = combineReducers({
    products:productReducers,
    product:productReducer,
    productDetails:productDetailsReducers,
    auth:authReducer,
    cart: cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    newProduct:newProductReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUser:allUserReducer,
    userDetails:userDetailsReducer,
    user:userReducer,
    forgotPassword:forgotPasswordReducer,
    productReviews:productReviewsReducer,
    review:reviewReducer
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