import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const {food_list}=useContext(StoreContext)
  return (
    <div className='md:mx-40  mx-28'>
        <h2 className='my-4 text-2xl font-semibold'>Top Dishes Near You</h2>
        <div  className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 '>
            {
                food_list.map((item,idx)=>{
                    if(category==="All" || item.category===category){
                        return <FoodItem key={idx} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }
                })
            }
        </div>
    </div>
  )
}

export default FoodDisplay