import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "https://bitez.onrender.com";
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [food_list, setFoodList] = useState([]);
    const [likedItems, setLikedItems] = useState([]);
    const[data,setData]=useState({
        name:"",
        email:"",
        password:""
      })
      const [state, setState] = useState("Login");
      const [showLogin,setShowLogin]=useState(false)
      const [user,setUser]=useState({});

    // Fetch food list from the API
    const getFoodList = async () => {
        try {
            const res = await axios.get(`${url}/api/food/list`);
            setFoodList(res.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const getUser=async(token)=>{
        if(token){
            try{
                const res=await axios.get(`${url}/api/user/get`,{headers:{token}});
                setUser(res.data.userData);
            }
            catch(error){
                console.error(error);
            }
        }
    }

    // Fetch cart data from the API
    const getCart = async (token) => {
        if (token) {
            try {
                const res = await axios.get(`${url}/api/cart/get`, { headers: { token } });
                setCartItems(res.data.cartData);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }
    };

    useEffect(() => {
        // Fetch food list on component mount
        getFoodList();

        // Fetch cart if token is available
        if (token) {
            getCart(token);
            likedFoodItems(token);
            getUser(token);
            
        }
    }, [token,state,showLogin]);

 

    const addToCart = async (itemId) => {
        // console.log(itemId)
        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId },
                    { headers: { token } }
                );
                setCartItems((prev) => ({
                    ...prev,
                    [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
                }));
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {

        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId },
                    { headers: { token } }
                );
                setCartItems((prevCartItems) => {
                    if (prevCartItems[itemId] > 1) {
                        return { ...prevCartItems, [itemId]: prevCartItems[itemId] - 1 };
                    } else {
                        const { [itemId]: _, ...rest } = prevCartItems;
                        return rest;
                    }
                });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const getTotalPrice = () => {
        let total = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    total += itemInfo.price * cartItems[item];
                }
            }
        }
        return total;
    };

    const getLikedItems = async (itemId) => {
        if (token) {
            
            try {
                const res = await axios.post(`${url}/api/profile/liked`, {itemId},{
                    headers: { token },
                });
                setLikedItems(res.data.likedFoods);
                console.log(likedItems);
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching liked items:", error);
            }
        }
    };

    const likedFoodItems = async (token) => {
        if(token){
            try {
                const res = await axios.get(`${url}/api/profile/getLiked`, { headers: { token } });
                setLikedItems(res.data.likedFoods);
            } catch (error) {
                console.error("Error fetching liked items:", error);
            }
        }
    }

    const isLiked = (itemId) => {
        return likedItems?.includes(itemId);
    };

    const onLoginHandler = async (e) => {
        e.preventDefault();
        let newUrl=url;
        if(state==="Login"){
          newUrl+='/api/user/login'
        }
        else{
          newUrl+='/api/user/register'
        }
        
        const res=await axios.post(newUrl,data);

        if(res.data.success){
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          setShowLogin(false);
          setData("");
        }
        else{
          alert(res.data.message);
        }
    
    
    
      }



    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
        url,
        token,
        setToken,
        likedItems,
        setLikedItems,
        getLikedItems,
        isLiked,
        onLoginHandler,
        data,
        setData,
        showLogin,
        setShowLogin,
        setState,
        state,
        user,
    };


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
