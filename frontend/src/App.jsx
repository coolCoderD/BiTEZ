import React ,{useState} from 'react'
import NavbarComp from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Login from './components/LoginPopup/Login'



function App() {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <>
    <div className='md:mx-40 mx-12  mt-3 scroll-smooth ' >
      {
        showLogin && <Login setShowLogin={setShowLogin}/>
      }
      <NavbarComp setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>} />
 </Routes>
    </div>
    <Footer/>

    </>

  )
}

export default App