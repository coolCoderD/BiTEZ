import React from 'react'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'



const Navbar = () => {
  return (
    <div>
      
        <div  className='flex justify-between items-center px-12 py-5'>
            <img src="https://res.cloudinary.com/drts3ztiy/image/upload/v1730352696/kojritvivoor3jpmqmzs_e_background_removal_f_png_c5smz7.png" className='w-48 h-32 object-cover ml-8' alt="" />
            <div className='fixed right-4 top-4'>
            <ToggleSwitch/>
            </div>
        </div>
 
    </div>
  )
}

export default Navbar