import React from 'react';
import { assets } from '../../assets/assets';



const Header = () => {
  return (

    <div className="text-gray-600 body-font mt-[-90px]">
      <div className="container px-5 py-24 flex flex-wrap">
        <div class="flex flex-wrap md:-m-2 -m-1">
	  <div className="flex flex-wrap w-1/2">
		<div className="md:p-2 p-1 w-1/2">
		  <img alt="gallery" className="w-full object-cover h-full object-center block overflow-hidden rounded-md" src={assets.header_img}/>
		</div>
		<div className="md:p-2 p-1 w-1/2">
		  <img alt="gallery" className="w-full object-cover h-full object-center block overflow-hidden rounded-md" src={assets.header_img}/>
		</div>
        <div className="md:p-2 p-1 w-full relative">
  <img
    alt="gallery"
    className="w-full h-full object-cover object-center block overflow-hidden rounded-md"
    src={assets.header_img}
  />
  <a href='#explore-menu' className=" m-4 absolute bottom-2 left-2 inline-flex text-black bg-white border-0 py-2 md:py-4 px-6 focus:outline-none  cursor-pointer rounded-full  text-lg">
    View Menu
  </a>
</div>

	  </div>
	  <div className="flex flex-wrap w-1/2">
		<div className="md:p-2 p-1 w-full">
		  <img alt="gallery" className="w-full h-full object-cover object-center block overflow-hidden rounded-md" src={assets.header_img}/>
		</div>
		<div className="md:p-2 p-1 w-1/2">
		  <img alt="gallery" className="w-full object-cover h-full object-center block overflow-hidden rounded-md" src={assets.header_img}/>
		</div>
		<div className="md:p-2 p-1 w-1/2">
		  <img alt="gallery" className="w-full object-cover h-full object-center block overflow-hidden rounded-md" src={assets.header_img}/>
		</div>
	  </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
