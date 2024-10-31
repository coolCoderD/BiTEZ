import React, { useContext, useState,useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const MyOrders = () => {
    const {url,token}=useContext(StoreContext);

    const [data,setData]=useState([]);

    const fetchData=async()=>{
        try{
            const res=await axios.post(`${url}/api/order/userorders`,{},{headers:{token}});
            console.log(res.data.orders);
            setData(res.data.orders);
        }
        catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{
        if(token) fetchData();
    },[token])

  return (
    <div>
        
    </div>
  )
}

export default MyOrders