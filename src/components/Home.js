import React,{useEffect,useState} from "react";
import MetaData from "./layouts/MetaData"
import {useDispatch,useSelector} from 'react-redux'
import {getProduct } from '../actions/productAction'
import Product from './Product'
import Loader from './layouts/Loader'
import {useAlert} from 'react-alert'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range)
const Home = ({match}) => {
  const [price,setprice] = useState([1,1000]);
  const [category,setcategory] = useState('');
  const [rating,setrating] = useState(0);
  const categories =[
    'Electronics',
    'Cameras',
    'Laptop',
    'Accessories',
    'Headphones',
    'Food',
    'Books',
    'Clothes/Shoes',
    'Beauty/Health',
    'Sports',
    'Outdoor',
    'Home'
  ]
  const alert = useAlert();
  const {loading,error,products,productsCount} = useSelector(state=>state.products)
  const dispatch = useDispatch();
  const keyword = match.params.keyword
  useEffect(() => {
    if(error){
      alert.error(error)
    }
   dispatch(getProduct(keyword,price,category,rating))
  
  }, [dispatch,error,alert,keyword,price,category,rating])
  return (
    <div>
      {
        loading?<Loader />:
        <>
          <MetaData title="Buy Best Products in Online"/>
          <section id="products" className="container mt-5">
            <div className="row">
              {
                keyword?<>
                <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                        <Range 
                          marks={{
                            1:`$1`,
                            1000:`$1000`
                          }}
                          min={1}
                          max={1000}
                          defaultValue={[1,1000]}
                          tipFormatter={value=>`$${value}`}
                          tipProps={{
                            placement:"top",
                            visible:true
                          }}
                          value={price}
                          onChange={price=>setprice(price)}
                        />
                        <hr className="my-5"/>
                        <div className="mt-5">
                          <h4 className="mb-3">
                             Categories
                          </h4>
                          <ul className="pl-0">
                                {
                                  categories.map((category,i)=>(
                                    <li
                                    style={{cursor:"pointer",listStyleType:'none'}} key={i}
                                    onClick={()=>setcategory(category)}
                                    >
                                      {category}

                                    </li>
                                  ))
                                }
                          </ul>
                        </div>
                        <hr className="my-3"/>
                        <div className="mt-5">
                          <h4 className="mb-3">
                             Ratings
                          </h4>
                          <ul className="pl-0">
                                {
                                  [5,4,3,2,1].map((star,i)=>(
                                    <li
                                    style={{cursor:"pointer",listStyleType:'none'}} key={i}
                                    onClick={()=>setrating(star)}
                                    >
                                      <div className="rating-outer">
                                        <div className="rating-inner" style={{width:`${star*20}%`}}></div>
                                      </div>

                                    </li>
                                  ))
                                }
                          </ul>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-9">
                  <div  className="row">
                    { products && products.map(product=>(
                      <Product key={product._id} product={product} col={4}/>
                    ))}
                  </div>
                </div>
                </>:
                products && products.map(product=>(
                  <Product key={product._id} product={product} col={3}/>
                ))
              }
              
            </div>
          </section>
          </>
        
      }
     
    </div>
  );
};

export default Home;
