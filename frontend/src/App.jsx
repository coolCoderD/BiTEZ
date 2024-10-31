import React ,{useContext, useState} from 'react'
import NavbarComp from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Login from './components/LoginPopup/Login'
import Heart from './components/Heart/Heart'
import { StoreContext } from './context/StoreContext'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import Toggler from './components/Toggler/Toggler'



function App() {
  const {setShowLogin,showLogin}=useContext(StoreContext)
  return (
    <>
    <div className='dark:bg-gray-900 dark:text-white '>
    <div className='  mt-3 scroll-smooth ' >
      <div className='fixed top-4 right-4 z-50'>
      <Toggler/>
      </div>
      {
        showLogin && <Login/>
      }
      <NavbarComp />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/random' element={<Heart/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
 </Routes>
    </div>
    <Footer/>
</div>
    </>

  )
}

export default App