import React from 'react'
import {assets} from '../../assets/admin_assets/assets.js'

const Navbar = () => {
  return (
    <div>
        <div  className='flex justify-between px-12 py-5'>
            <img src={assets.logo} alt="" />
            <img className='w-16 h-16 rounded-full object-cover' src={assets.tomato_logo} alt="" />
        </div>
    </div>
  )
}

export default Navbar