import React from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Home from './pages/Home/Home';
import { useTheme } from './context/ThemeContext';
import ToggleSwitch from './components/ToggleSwitch/ToggleSwitch';

function App() {


  return (
    <>
      <div className='dark:bg-gray-900'>
        
        <ToastContainer />
        <Navbar />
        <hr />
        <div>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            {/* <Route path="/orders" element={<Orders />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
