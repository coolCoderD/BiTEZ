import React from 'react'
import { menu_list } from '../../assets/assets'


const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='mx-5 pt-36 ' id='explore-menu'>
            <h1 className='text-4xl font-semibold mb-4'>Explore our menu</h1>
            <p className='w-3/4 '>Choose from a diverse menu featuring a detectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time. </p>
            <div className='flex flex-nowrap justify-between items-center overflow-x-auto scrollbar-hide gap-9 mt-3  '>
                {menu_list.map((menu) => (
                    <div key={menu.menu_name} onClick={()=>setCategory(prev=>prev===menu.menu_name? "All":menu.menu_name)} className='flex-shrink-0 w-24 flex flex-col items-center cursor-pointer '>
                        <img
                            src={menu.menu_image}
                            alt={menu.menu_name}
                            className={`w-full h-auto object-cover ${category===menu.menu_name? "border-4 border-[#ff6347] rounded-full p-0.5":""}`}
                        />
                        <p className="text-center mt-2 font-medium">{menu.menu_name}</p>
                        <hr className='bg-gray-900 w-full h-full ' />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ExploreMenu