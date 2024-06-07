import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const Login = ({ setShowLogin }) => {
  const [state, setState] = useState("Login");

  return (
    <>
    <Overlay show={true} />
    <div className="flex flex-col items-center p-9 border border-gray-300 rounded-lg  shadow-md absolute z-50 top-1/4 left-28  md:top-1/4 md:left-1/3  md:-translate-x-1/2 md:-translate-y-1/2 w-[400px] h-min-[500px]  bg-white animate-fade-up  animate-duration-300 animate-ease-linear">
      <h1 className="text-3xl font-bold  mb-4">{state}</h1>

      {/* Close Button */}
      <img
        src={assets.cross_icon}
        alt="Close"
        className="absolute top-3 right-3 cursor-pointer"
        onClick={() => setShowLogin(false)}
      />

      <form className="w-full flex flex-col gap-1">
        {state === 'Sign Up' && (
          <input
            type="text"
            placeholder="Enter name"
            className="w-full p-2 mb-2 border border-gray-300 rounded-full outline-none text-center  bg-transparent"
            required
          />
        )}
        <input
          type="text"
          placeholder="Enter email"
          className="w-full p-2 mb-2 border border-gray-300  rounded-full outline-none text-center"
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-2 mb-2 border border-gray-300 rounded-full outline-none text-center"
          required
        />
      </form>

      <button className="bg-[#ff6347] text-white px-4 py-2 w-full  rounded-full mt-4">
        {state === 'Login' ? 'Login' : 'Create new account'}
      </button>

      <div className="mt-4 flex gap-2 items-center justify-center">
        <input type="checkbox" className="mr-2 w-5 " required />
        <p className="text-sm">
          By continuing, I agree to the Terms of Use and Privacy Policy.
        </p>
      </div>

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
