import React,{useState,useEffect} from "react";
import {useDispatch,useSelector} from 'react-redux'
import {register,clearErrors } from '../../actions/userAction'
import {useAlert} from 'react-alert'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import {Link} from 'react-router-dom'
const Register = ({history}) => {
    const [user,setuser] = useState({
        name:'',
        email:'',
        password:'',
    })
    const {name,email,password} = user;
    const [avatar,setavatar] = useState('');
    const [avatarPreview,setavatarPreview] = useState('/images/camera.jpg');
    const alert = useAlert();
    const dispatch = useDispatch();
    const {isRegister,error,loading} = useSelector(state=>state.auth);
    useEffect(()=>{
        if(isRegister){
            history.push('/login');
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        
    },[dispatch,alert,isRegister,error,history])
    const submitHandler=e=>{
        e.preventDefault();
        const formData = new FormData();
        formData.set('name',name);
        formData.set('email',email);
        formData.set('password',password);
        formData.set('avatar',avatar);
        dispatch(register(formData))
    }
   const onChange =e=>{
       if(e.target.name === 'avatar'){
            const reader = new FileReader();
            reader.onload=()=>{
                if(reader.readyState ===2){
                    setavatar(reader.result)
                    setavatarPreview(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
       }else{
        setuser({
            ...user,
            [e.target.name]:e.target.value 
        })
       }
   }
  return (
    <>
      <MetaData title="Register User" />
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" encType="multipart/form-data" onSubmit={submitHandler}>
            <h1 className="mb-3">Register</h1>

            <div className="form-group">
              <label for="email_field">Name</label>
              <input
                type="name"
                name="name"
                id="name_field"
                className="form-control"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label for="email_field">Email</label>
              <input
                type="email"
                name="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label for="password_field">Password</label>
              <input
                type="password"
                name="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label for="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img src={avatarPreview} className="rounded-circle" alt="image" />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" for="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="register_button"
              type="submit"
              className="btn btn-block py-3"
              disable={loading?true:false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
