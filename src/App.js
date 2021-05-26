import React,{useEffect,useState} from 'react'
import {BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'
import Home from './components/Home'
import ProductDetails from './components/ProductDetails'
import Login from './components/user/Login'
import Register from './components/user/Register'
import Cart from './components/Cart'
import Shipping from './components/Shipping'
import {loaduser} from './actions/userAction'
import Store from './components/Store'
import Confirm from './components/Confirmorder'
import './App.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import ProtectedRoute from './route/ProtectedRoute'
import Payment from './components/Payment'
import Success from './components/OrderSuccess'
import ListOrders from './components/ListOrders'
import OrderDetails from './components/OrderDetails'
// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import Dashboard from './components/admin/Dashboard'
import ProductsList from './components/admin/ProductList'
import NewProduct from './components/admin/NewProduct'
import UpdateProduct from './components/admin/UpdateProduct'
const App = () => {
  const[stripeApiKey,setStripeApiKey] = useState('')
  useEffect(() => {
   Store.dispatch(loaduser())
   async function getStripApiKey(){
     const {data} = await axios.get('/api/v1/stripeapi')
     console.log(data)
     setStripeApiKey(data.stripeApiKey)
   }
   getStripApiKey()
  },[])
  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  return (
    <Router>
      <Header/>
          <div className="container container-fluid">
            <Route exact path="/" component={Home}/>
            <Route  path="/search/:keyword" component={Home}/>
            <Route  path="/product/:id" component={ProductDetails}/>
            <Route  path="/login" component={Login}/>
            <Route  path="/register" component={Register}/>
            <Route  path="/cart" component={Cart}/>
            <ProtectedRoute  path="/shipping" component={Shipping}/>
            <ProtectedRoute  path="/confirm" component={Confirm}/>
            <ProtectedRoute  path="/success" component={Success}/>
            <ProtectedRoute  path="/orders/me" component={ListOrders} exact />
            <ProtectedRoute  path="/order/:id" component={OrderDetails} exact />
            {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }
          </div>
          
          <ProtectedRoute  path="/dashboard" isAdmin={true} component={Dashboard}/>
          <ProtectedRoute  path="/admin/products" isAdmin={true} component={ProductsList}/>
          <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact />
          <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact />
          {!loading && (!isAuthenticated || user.role !== 'admin') && (
            <Footer />
          )}
     
    </Router>
  )
}

export default App

