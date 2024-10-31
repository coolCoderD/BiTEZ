import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const {url}=useContext(StoreContext);
    const navigate=useNavigate();
    const verifyPayment=async()=>{
        try{
            const res=await axios.post(`${url}/api/order/verify`,{success,orderId});
            if(res.data.success) navigate("/myorders");
            else navigate("/");

        }
        catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[]);
  return (
    <div>Verify</div>
  )
}

export default Verify