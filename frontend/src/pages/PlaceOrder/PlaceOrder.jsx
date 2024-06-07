import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const {getTotalPrice}=useContext(StoreContext);
  const cartDetails={
    "Subtotal":getTotalPrice()*10,"Delivery Fee":200,"Total":getTotalPrice()*10+200
}
  
  return (
    <div className='grid lg:grid-cols-2 gap-9'>
  <div>
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold mb-4">Delivery Information</h1>
  <form action="">

  <div className="mb-6">
    <h2 className="text-lg font-medium mb-2">Customer Details</h2>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label for="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
        <input type="text" id="firstName" name="firstName" 
               className="mt-1 p-2 w-full border rounded-md shadow-sm outline-[tomato] bg-gray-100"/>
      </div>
      <div>
        <label for="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
        <input type="text" id="lastName" name="lastName"  
               className="mt-1 p-2 w-full border rounded-md shadow-sm outline-[tomato] bg-gray-100"/>
      </div>
      <div>
        <label for="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" 
               className="mt-1 p-2 w-full border rounded-md shadow-sm outline-[tomato] bg-slate-100"/>
      </div>
      <div>
        <label for="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <div className="flex mt-1">
          <select name="countryCode" className="p-2 border rounded-md shadow-sm outline-[tomato] bg-slate-100">
            <option value="IN">+91(IN)</option> 
          </select>
          <input type="tel" id="phone" name="phone" 
                 className="p-2 w-full border rounded-md shadow-sm outline-[tomato]  bg-slate-100"/>
        </div>
      </div>
    </div>
  </div>

  <div className="mb-6">
    <h2 className="text-lg font-medium mb-2">Shipping Details</h2>
    <div>
      <label for="address" className="block text-sm font-medium text-gray-700">Street Address</label>
      <input type="text" id="address" name="address" 
             className="mt-1 p-2 w-full border rounded-md shadow-sm outline-[tomato]  bg-slate-100"/>
    </div>
    <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
            <label for="postalCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input type="text" id="postalCode" name="postalCode" 
                className="mt-1 p-2 w-full border rounded-md shadow-sm outline-[tomato]  bg-slate-100"/>
        </div>
        <div>
            <label for="city" className="block text-sm font-medium text-gray-700">City</label>
            <input type="text" id="city" name="city" 
                className="mt-1 p-2 w-full border rounded-md shadow-sm outline-[tomato]  bg-slate-100"/>
        </div>
        <div>
            <label for="country" className="block text-sm font-medium text-gray-700">Country</label>
            <select name="country" id="country" 
                className="mt-1 p-2 w-full border rounded-md shadow-sm outline-[tomato]  bg-slate-100">
                <option value="IN">India</option>
            </select>
        </div>
    </div>
</div>
</form>


</div>

    </div>
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
            Proceed to Payment
        </button>

        </div>

    </div>
  )
}

export default PlaceOrder