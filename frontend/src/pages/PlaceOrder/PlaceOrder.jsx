import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';

const PlaceOrder = () => {
  const { getTotalPrice, token, food_list, cartItems, url } = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "India",
    phone: ""
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (e) => {
    setLoading(true);
    e.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          food: item._id,
          quantity: cartItems[item._id]
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalPrice() + 200,
    };

    let res = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });

    setLoading(false);
    if (res.data.success) {
      const { session_url } = res.data;
      window.location.replace(session_url);
    } else {
      alert(res.data.message);
    }
  };

  const cartDetails = {
    "Subtotal": getTotalPrice(),
    "Delivery Fee": 200,
    "Total": getTotalPrice() + 200
  };

  return (
    <div className="flex md:flex-row flex-col justify-center mx-12  items-center gap-4  ">
      {
        loading && (
          <div className='absolute top-1/2 left-1/2'>
            <Loader/>
          </div>
        )
      }
      <div>
        <div className="container w-full mx-auto p-2 bg-white dark:bg-gray-900 rounded-lg shadow-md ">
          <h1 className="text-2xl font-bold mb-4">Delivery Information</h1>
          <form onSubmit={placeOrder} >
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Customer Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium dark:text-white text-gray-700">First Name</label>
                  <input name="firstName" onChange={onChangeHandler} value={data.firstName} required type="text" id="firstName"
                    className="mt-1 p-2 w-full border rounded-md shadow-sm dark:text-black outline-[tomato] bg-gray-100" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium dark:text-white text-gray-700">Last Name</label>
                  <input name="lastName" onChange={onChangeHandler} value={data.lastName} required type="text" id="lastName"
                    className="mt-1 dark:text-black p-2 w-full border rounded-md shadow-sm outline-[tomato] bg-gray-100" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium dark:text-white text-gray-700">Email</label>
                  <input name="email" onChange={onChangeHandler} value={data.email} required type="email" id="email"
                    className="mt-1 dark:text-black p-2 w-full border rounded-md shadow-sm outline-[tomato] bg-gray-100" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium dark:text-white text-gray-700">Phone Number</label>
                  <div className="flex mt-1">
                    <select name="countryCode" className="p-2 border dark:text-black rounded-md shadow-sm outline-[tomato] bg-gray-100">
                      <option value="IN" >+91(IN)</option>
                    </select>
                    <input name="phone" onChange={onChangeHandler} value={data.phone} required type="tel" id="phone"
                      className="p-2 dark:text-black w-full border  rounded-md shadow-sm outline-[tomato] bg-gray-100" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Shipping Details</h2>
              <div>
                <label htmlFor="street" className="block dark:text-white text-sm font-medium text-gray-700">Street Address</label>
                <input name="street" onChange={onChangeHandler} value={data.street} required type="text" id="street"
                  className="mt-1  p-2 dark:text-black w-full border rounded-md shadow-sm outline-[tomato] bg-gray-100" />
              </div>
              <div>
                <label htmlFor="state" className="block dark:text-white text-sm font-medium text-gray-700">State</label>
                <input name="state" onChange={onChangeHandler} value={data.state} required type="text" id="state"
                  className="mt-1 dark:text-black p-2 w-full border rounded-md shadow-sm outline-[tomato] bg-gray-100" />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="zipcode" className="block dark:text-white text-sm font-medium text-gray-700">Zip Code</label>
                  <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} required type="text" id="zipcode"
                    className="mt-1 dark:text-black p-2 w-full border rounded-md shadow-sm outline-[tomato] bg-gray-100" />
                </div>
                <div>
                  <label htmlFor="city" className="block dark:text-white text-sm font-medium text-gray-700">City</label>
                  <input name="city" onChange={onChangeHandler} value={data.city} required type="text" id="city"
                    className="mt-1 dark:text-black p-2 w-full border rounded-md shadow-sm outline-[tomato] bg-gray-100" />
                </div>
                <div>
                  <label htmlFor="country" className="block dark:text-white text-sm font-medium text-gray-700">Country</label>
                  <select disabled name="country" id="country" value={data.country}
                    className="mt-1 dark:text-black p-2 w-full border rounded-md shadow-sm outline-[tomato] bg-gray-100">
                    <option value="IN">India</option>
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className={`inline-flex text-white bg-[tomato] border-0 py-2 px-6 focus:outline-none hover:bg-[orangered] mt-4 rounded text-lg ${loading ? 'cursor-not-allowed' : ''}`}>
              Proceed to Payment
            </button>
          </form>
        </div>
      </div>

      <div className="px-36 py-4 bg-[tomato] text-white rounded-lg shadow-lg mt-10 text-center ">
        <h1 className="text-2xl text-center font-bold mb-2">Cart Totals</h1>
        {
          Object.keys(cartDetails).map((key) => {
            return (
              <div className="grid grid-cols-2 gap-3 p-1" key={key}>
                <p className="font-medium">{key}</p>
                <p className="font-medium">{cartDetails[key]}</p>
                <hr className="bg-gray-900 w-full h-full" />
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default PlaceOrder;
