import React, {useEffect, useState } from "react";
import {
  ClickOutsideListener,
  useClickOutsideListener,
} from "react-click-outside-listener";
import Logo from '../../logo.png';
import {Link} from 'react-router-dom';
import axios from 'axios';
import SearchLoader from './SearchLoader';


const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [getproducts,setProducts] = useState([]);
  const [loading,setLoading] = useState(false);
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  const searchDivClick = () => {
    document.querySelector(".searchDiv").style.display = " inline-table";
  };
  const searchDivBlur = () => {
    document.querySelector(".searchDiv").style.display = "none";
  };
  const onChangeKey=async(e)=>{
        setKeyword(e.target.value);
        setLoading(true);
        // console.log(e.target.value)
        if(e.target.value === ''){
          setLoading(true);
          const nullArray = [];
          setProducts(nullArray);
        }else{
          let link = `/api/v1/product?keyword=${e.target.value}`;
          const {data} = await axios.get(link);
          setLoading(false);
          setProducts(data.products);
        }
       

  }
  // console.log(getproducts);

  return (
    <ClickOutsideListener onClickOutside={searchDivBlur}>
      <form onSubmit={searchHandler} autoComplete="off">
        <div className="input-group">
          <input
            type="text"
            id="search_field"
            className="form-control"
            placeholder="Enter Product Name ..."
            onChange={onChangeKey}
            onClick={searchDivClick}
            onDoubleClick={searchDivBlur}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div
          data-qa-id="omni-suggestions-list"
          className="c-omni-suggestion-list "
        >
          <div className="c-omni-suggestion-group">
            <div className="abc searchDiv">
              <div
                data-qa-id="omni-suggestion-listing"
                data-nav-list-item="true"
                className="c-omni-suggestion-item "
              >
               { loading?
              <SearchLoader />
              :
              getproducts.map(product=>(
                <Link to={`/product/${product._id}`} key={product._id} onClick={searchDivBlur}>
                <div className="row"> 
                  <div className="col-3">
                    <div className="c-omni-suggestion-item__media">
                      <div className="c-omni-suggestion-item__media__item">
                        {" "}
                        <img
                          className="img-fluid"
                          src={product.images[0].url}
                          alt="Image Description"
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="col-9">
                    <span className="c-omni-suggestion-item__content">
                      <div
                        data-qa-id="omni-suggestion-main"
                        className="c-omni-suggestion-item__content__title"
                      >
                       {product.name}
                      </div>
                      <div className="fontsize10">${product.price} </div>
                    </span>
                  </div>
                </div>          
                </Link>
                ))
              }
               </div>
            </div>
          </div>
        </div>
      </form>
    </ClickOutsideListener>
  );
};

export default Search;
