import React, { useContext, useEffect, useState } from 'react'

import { StoreContext } from '../../context/StoreContext';
import Heart from '../Heart/Heart';

const FoodItem = ({id,name,price,description,image}) => {
  const { cartItems, addToCart, removeFromCart, showEmpty, likedItems } = useContext(StoreContext);
  


  function addAndShow(id) {
    addToCart(id);
    showEmpty(false);
  }

  return (
    <div className='rounded-md p-3 relative shadow-lg animate-fade-up animate-once animate-ease-in-out'>
      <img className='rounded-t-3xl' src={image} alt="" />
      <div className="absolute top-4 right-4">
        <Heart itemId={id} />
      </div>

      {
        !cartItems[id] ? 
        <img className='absolute top-4 w-10 ml-2' src="https://res.cloudinary.com/drts3ztiy/image/upload/v1730384769/add_icon_white_srjt3e.png" onClick={() => addToCart(id)} /> :
        <div className='absolute top-5 ml-2 flex items-center bg-white rounded-full px-1 py-1 text-black'>
          <img className='w-6' src="https://res.cloudinary.com/drts3ztiy/image/upload/v1730384772/remove_icon_red_nw2dos.png" onClick={() => removeFromCart(id)} />
          <p className='mx-2'>{cartItems[id]}</p>
          <img className='w-6' src="https://res.cloudinary.com/drts3ztiy/image/upload/v1730384768/add_icon_green_o58v0b.png" onClick={() => addToCart(id)} />   
        </div>
      }
      <div>
        <div className='flex justify-center gap-7 mt-3'>
          <p className='text-xl font-semibold'>{name}</p>
        </div>
        <p className='text-gray-500'>{description}</p>
        <p className='text-xl font-semibold text-[tomato] mt-3'>₹{price}</p>
      </div>
    </div>
  )
}

export default FoodItem;
