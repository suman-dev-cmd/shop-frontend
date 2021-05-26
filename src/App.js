import React,{useEffect,useState} from 'react'
import {Switch,Route} from 'react-router-dom'
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
import ProtectedRoute from './route/ProtectedRoute'
import Payment from './components/Payment'
import Success from './components/OrderSuccess'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

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
  return (
    <div>
      <Header/>
        <div className="container container-fluid">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route  path="/search/:keyword" component={Home}/>
            <Route  path="/product/:id" component={ProductDetails}/>
            <Route  path="/login" component={Login}/>
            <Route  path="/register" component={Register}/>
            <Route  path="/cart" component={Cart}/>
            <ProtectedRoute  path="/shipping" component={Shipping}/>
            <ProtectedRoute  path="/confirm" component={Confirm}/>
            <ProtectedRoute  path="/success" component={Success}/>
            {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }
          </Switch>
        </div>
      <Footer />
    </div>
  )
}

export default App

