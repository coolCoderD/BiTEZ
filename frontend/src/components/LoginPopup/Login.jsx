import React, { useContext, useEffect, useState } from 'react';

import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';


const Login = () => {
  const {url,setToken,onLoginHandler,data,setData,state,setState,setShowLogin}=useContext(StoreContext)

  const [password,setPassword]=useState("password")
  




  const onChangeHandler=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
     setData(data=>({...data,[name]:value}));
  }

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);


  // const onLoginHandler = async (e) => {
  //   e.preventDefault();
  //   let newUrl=url;
  //   if(state==="Login"){
  //     newUrl+='/api/user/login'
  //   }
  //   else{
  //     newUrl+='/api/user/register'
  //   }
    
  //   const res=await axios.post(newUrl,data);
  //   console.log(res.data);
  //   if(res.data.success){
  //     setToken(res.data.token);
  //     localStorage.setItem("token", res.data.token);
  //     setShowLogin(false);
  //   }
  //   else{
  //     alert(res.data.message);
  //   }



  // }
  return (
    <>
    <Overlay show={true} />
    <div className="flex  fixed flex-col items-center p-9 border border-gray-300 rounded-lg  shadow-md  z-50 top-1/4   md:top-1/4 md:left-1/3 left-[10%]  md:-translate-x-1/2 md:-translate-y-1/2 w-[400px] h-min-[500px]  bg-white animate-fade-up  animate-duration-300 animate-ease-linear dark:bg-gray-900">
      <h1 className="text-3xl font-bold   mb-4">{state}</h1>

      {/* Close Button */}
      <img
        src="https://res.cloudinary.com/drts3ztiy/image/upload/v1730384769/cross_icon_wqppxy.png"
        alt="Close"
        className="absolute top-3 right-3 cursor-pointer"
        onClick={() => setShowLogin(false)}
      />

      <form onSubmit={onLoginHandler} className="w-full flex flex-col gap-1">
        {state === 'Sign Up' && (
          <input
            type="text"
            name='name'
            onChange={onChangeHandler}
            value={data.name}
            placeholder="Enter name"
            className="w-full  p-2 mb-2 border border-gray-300 rounded-full outline-none   bg-transparent cursor-pointer"
            required
          />
        )}
        <input
          type="text"
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          placeholder="Enter email"
          className="w-full p-2 mb-2 border border-gray-300  rounded-full outline-none cursor-pointer  bg-transparent"
          required
        />
        <div className='relative'>
        <input
          type={password}
          name="password"
          onChange={onChangeHandler}
          value={data.password}
          placeholder="Enter password"
          className="w-full p-2 mb-2 border bg-transparent border-gray-300 rounded-full outline-none "
          required
        />
        <div className='absolute cursor-pointer top-2 right-4' onClick={()=>{setPassword(password==="password"?"text":"password")}}>
          {
            password==="password"? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>:
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>


          }
        </div>

        </div>
      </form>

      <button type="submit" className="bg-[#ff6347] text-white px-4 py-2 w-full  rounded-full mt-4" onClick={onLoginHandler}>
        {state === 'Login' ? 'Login' : 'Create new account'}
      </button>

      {/* <div className="mt-4 flex gap-2 items-center justify-center">
        <input type="checkbox" className="mr-2 w-5 " required />
        <p className="text-sm">
          By continuing, I agree to the Terms of Use and Privacy Policy.
        </p>
      </div> */}

      <p className="mt-4 text-sm">
        {state === "Login" ? (
          <>
            <h1 className='text-lg font-semibold'>Don't have an account?{' '}
            <span
              className="text-[#ff6347] underline cursor-pointer text-lg"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span></h1>
          </>
        ) : (
          <>
            <h1 className='text-lg font-semibold'>Already have an account?{' '}
            <span
              className="text-[#ff6347] underline cursor-pointer text-lg"
              onClick={() => setState("Login")}
            >
              Login
            </span></h1>
          </>
        )}
      </p>
    </div>
    </>
  );
};

export default Login;

const Overlay = ({ show }) => {
    return (
      show && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-50 " 
          onClick={() => setShowLogin(false)} 
        ></div>
      )
    );
  };
