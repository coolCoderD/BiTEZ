import React,{useContext,useEffect,useState} from 'react'
import{ StoreContext} from '../../context/StoreContext'
import CartEmpty from './CartEmpty'

import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {cartItems,food_list,removeFromCart,getTotalPrice,url}=useContext(StoreContext);
  const  navigate=useNavigate();
  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  const cartDetails={
      "Subtotal":getTotalPrice(),"Delivery Fee":200,"Total":getTotalPrice()+200
  }
  return (
    <>{
      isEmpty(cartItems) ? <CartEmpty /> :
      
      <div className='md:mx-40  mx-28'>
      <div  className='grid grid-cols-7  md:gap-4 p-4  '>
        <p className="font-bold" >Items</p>
        <p className="font-bold md:col-span-2">Title</p>
        <p className="font-bold">Price</p>
        <p className="font-bold hidden md:block">Quantity</p>
        <p className="font-bold">Total</p>
        <p className="font-bold">Remove</p>
      </div>
      <hr className='bg-gray-900 w-full h-full' />
      {
        food_list.map((item,idx)=>{
          if(cartItems[item._id]>0){
            return (
              <>
              <div className='grid grid-cols-7 gap-4 p-4 '>
                <img className='w-[70px] ' src={item.image} alt="" />
                <p className='md:col-span-2'>{item.name}</p>
                <p>{item.price}</p>
                <p className='hidden md:block'>{cartItems[item._id]}</p>
                <p>{item.price*cartItems[item._id]}</p>
                <p className='cursor-pointer' onClick={()=>removeFromCart(item._id)}><img src="https://res.cloudinary.com/drts3ztiy/image/upload/v1730384769/cross_icon_wqppxy.png" alt="" /></p>
              </div>
              <hr className='bg-gray-900 w-full h-full ' />
              </>
            )
          }
        })
      }
      <div className='grid md:grid-cols-2 gap-4 md:gap-9 '>
        <div className=' px-4 py-4'>
        <h1 className='text-2xl font-bold mb-2'>Cart Totals</h1>
        {
          Object.keys(cartDetails).map((key)=>{
            return (
              <>
              <div className='grid grid-cols-2 gap-3 p-1'>
                <p className='font-medium'>{key}</p>
                <p className='font-medium'>{cartDetails[key]}</p>
                <hr className='bg-gray-900 w-full h-full'/>
              </div>
              </>
            )
          })
        }
        <button class="inline-flex text-white bg-[tomato] border-0 py-2 px-6 focus:outline-none hover:bg-[orangered] mt-4 rounded text-lg" onClick={()=>navigate('/order')}>
            Proceed to Checkout
        </button>

        </div>
        {/* <div className='p-4'>
  <h2 className='text-lg font-semibold'>If you have any promo code. Enter it here</h2>
  <div className='grid grid-cols-5'>
    <input 
      className='col-span-4 mt-2 bg-gray-200 px-4 py-2 h-10 outline-none rounded-md' 
      type="text" 
      placeholder='Enter promo code' 
    />
    <button className='bg-black text-white col-span-1 px-2 py-2 translate-y-1 translate-x-[-100px]  rounded-md'>Submit</button>
  </div>
</div> */}

      </div>
    </div> 
  
    }
    </>
  )
}

export default Cart