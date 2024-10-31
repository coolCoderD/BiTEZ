import React from 'react'


const Footer = () => {
  return (
<div>
<footer className="relative bg-gray-700 pt-8 text-white pb-6 mt-40 md:p-10" id='footer'>
  <div className="container mx-auto px-4 ">
    <div className="flex flex-wrap text-left lg:text-left">
      <div className="w-full lg:w-6/12 px-4">
        <h4 className="text-3xl fonat-semibold text-blueGray-700">Let's keep in touch!</h4>
        <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
          Find us on any of these platforms, we respond 1-2 business days.
        </h5>

      </div>

    </div>
    <hr className="my-6 border-blueGray-300"/>
    <div className="flex flex-wrap items-center md:justify-between justify-center">
      <div className="w-full md:w-4/12 px-4 mx-auto text-center">
        <div className="text-sm text-blueGray-500 font-semibold py-1">
          Copyright © <span id="get-current-year">2024</span>
        </div>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer