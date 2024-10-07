import { createContext,useEffect,useState } from "react"
import axios from 'axios';


export const StoreContext=createContext(null)

const StoreContextProvider=((props)=>{
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [food_list, setFoodList] = useState([]);
    
  
    // Fetch food list from the API
    const getFoodList = async () => {
      try {
        const res = await axios.get(`${url}/api/food/list`);
        setFoodList(res.data);
      } catch (error) {
        console.error("Error fetching food list:", error);
      }
    };
    useEffect(() => {
        // Fetch food list and set token from localStorage
        async function fetchData() {
          await getFoodList();
          if(localStorage.getItem("token")) setToken(localStorage.getItem("token"));
          await getCart(localStorage.getItem("token"));
        }
        fetchData();
      }, []);

    const addToCart=async(itemId)=>{
        console.log(itemId);
        if(!cartItems[itemId]) setCartItems(prev=>({...prev,[itemId]:1}))
        else setCartItems(prev=>({...prev,[itemId]:cartItems[itemId]+1}))

        if(token){
            await axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}});
        }
    }

    const removeFromCart = async(itemId) => {
        setCartItems(prevCartItems => {
        if (prevCartItems[itemId] > 1) {
            return { ...prevCartItems, [itemId]: prevCartItems[itemId] - 1 };
        } else {
            const { [itemId]: _, ...rest } = prevCartItems;
            return rest;
        }
        }
    );
    if(token){
        await axios.post(`${url}/api/cart/remove`,{itemId},{headers:{token}});
    }
    };


    const getCart = async (token) => {
        if(token){
            const res = await axios.get(`${url}/api/cart/get`,{headers:{token}});
            setCartItems(res.data.cartData);
        }
    };

    const getTotalPrice = () => {
        let total = 0;

        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=food_list.find((product)=>product._id===item);
                total+=itemInfo.price*cartItems[item];
            }
        }
        return total;
    };
    
    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems]);
    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
        url,
        token,
        setToken
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
})

export default StoreContextProvider