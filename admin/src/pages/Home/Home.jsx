import React from 'react';

const Home = () => {
  return (
    <div className='px-5 py-3  dark:bg-gray-900 h-screen'>
    <div className='px-24 py-16 mb-20 bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-lg shadow-lg '>
      <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
        Welcome to <span className='text-yellow-300'>BiTEZ</span> Admin Dashboard
      </h1>
      <p className='mt-6 text-lg md:text-xl lg:text-2xl font-light'>
        <span className='font-semibold'>Manage, Monitor,</span> and 
        <span className='font-semibold'> Grow</span> Your Food Delivery Business
      </p>
    </div>
    </div>
  );
};



export default Home;
