import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({id,name,price,description,image}) => {
  console.log(id);

  const{cartItems,addToCart,removeFromCart,showEmpty}=useContext(StoreContext);
  function addAndShow(id){
    addToCart(id);
    showEmpty(false);
  }
  return (
    <div className='rounded-md p-3 relative shadow-lg animate-fade-up animate-once animate-ease-in-out '>
        <img  className='rounded-t-3xl ' src={image} alt="" />
        {
          !cartItems[id]? <img className='absolute top-4 w-10 ml-2' src={assets.add_icon_white} onClick={()=>addToCart(id)} /> :
          <div className='absolute top-5 ml-2  flex items-center bg-slate-100 rounded-full px-1 py-1' >
            <img className='w-6' src={assets.remove_icon_red} onClick={()=>removeFromCart(id)} />
            <p className='mx-2'>{cartItems[id]}</p>
            <img className='w-6' src={assets.add_icon_green} onClick={()=>addToCart(id)} />
          </div>
        }
        <div>
            <div className='flex justify-center gap-7 mt-3'>
                <p className='text-xl font-semibold'>{name}</p>
            </div>
            <p className='text-gray-500'>{description}</p>
            <p className='text-xl font-semibold text-[tomato] mt-3'>₹{price*10}</p>
        </div>
    </div>
  )
}

export default FoodItem