import { createContext,useEffect,useState } from "react"
import { food_list } from "../assets/assets"


export const StoreContext=createContext(null)

const StoreContextProvider=((props)=>{
    const[cartItems,setCartItems]=useState({});


    const addToCart=(itemId)=>{
        if(!cartItems[itemId]) setCartItems(prev=>({...prev,[itemId]:1}))
        else setCartItems(prev=>({...prev,[itemId]:cartItems[itemId]+1}))
    }

    const removeFromCart = (itemId) => {
        setCartItems(prevCartItems => {
        if (prevCartItems[itemId] > 1) {
            return { ...prevCartItems, [itemId]: prevCartItems[itemId] - 1 };
        } else {
            const { [itemId]: _, ...rest } = prevCartItems;
            return rest;
        }
        });
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
        getTotalPrice
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
})

export default StoreContextProvider