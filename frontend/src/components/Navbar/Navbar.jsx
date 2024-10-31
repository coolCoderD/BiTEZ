import React,{useContext} from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
 

import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from '../../context/StoreContext';
export  default function NavbarComp() {
  
  const [openNav, setOpenNav] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { getTotalPrice,setToken,token,setShowLogin,user,setLikedItems,setState,setCartItems,cartItems} = useContext(StoreContext);
  const navigate=useNavigate();

  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    setLikedItems("");
    setCartItems("");
    navigate("/");

  }

  const signinHandler = () => {
    setShowLogin(true);
    setState("Sign Up")
  };
 
  const loginHandler = () => {
    setShowLogin(true);
    setState("Login")
  }
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, [cartItems]);

  const closeMenu = () => setIsMenuOpen(false);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <svg
          width="16"
          height="15"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 0.5C4.73478 0.5 4.48043 0.605357 4.29289 0.792893C4.10536 0.98043 4 1.23478 4 1.5C4 1.76522 4.10536 2.01957 4.29289 2.20711C4.48043 2.39464 4.73478 2.5 5 2.5H11C11.2652 2.5 11.5196 2.39464 11.7071 2.20711C11.8946 2.01957 12 1.76522 12 1.5C12 1.23478 11.8946 0.98043 11.7071 0.792893C11.5196 0.605357 11.2652 0.5 11 0.5H5ZM2 4.5C2 4.23478 2.10536 3.98043 2.29289 3.79289C2.48043 3.60536 2.73478 3.5 3 3.5H13C13.2652 3.5 13.5196 3.60536 13.7071 3.79289C13.8946 3.98043 14 4.23478 14 4.5C14 4.76522 13.8946 5.01957 13.7071 5.20711C13.5196 5.39464 13.2652 5.5 13 5.5H3C2.73478 5.5 2.48043 5.39464 2.29289 5.20711C2.10536 5.01957 2 4.76522 2 4.5ZM0 8.5C0 7.96957 0.210714 7.46086 0.585786 7.08579C0.960859 6.71071 1.46957 6.5 2 6.5H14C14.5304 6.5 15.0391 6.71071 15.4142 7.08579C15.7893 7.46086 16 7.96957 16 8.5V12.5C16 13.0304 15.7893 13.5391 15.4142 13.9142C15.0391 14.2893 14.5304 14.5 14 14.5H2C1.46957 14.5 0.960859 14.2893 0.585786 13.9142C0.210714 13.5391 0 13.0304 0 12.5V8.5Z"
            fill="#90A4AE"
          />
        </svg>
 
        <a href="#header" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        variant="medium"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
                <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 0.5C1.46957 0.5 0.960859 0.710714 0.585786 1.08579C0.210714 1.46086 0 1.96957 0 2.5V4.5C0 5.03043 0.210714 5.53914 0.585786 5.91421C0.960859 6.28929 1.46957 6.5 2 6.5H4C4.53043 6.5 5.03914 6.28929 5.41421 5.91421C5.78929 5.53914 6 5.03043 6 4.5V2.5C6 1.96957 5.78929 1.46086 5.41421 1.08579C5.03914 0.710714 4.53043 0.5 4 0.5H2ZM2 8.5C1.46957 8.5 0.960859 8.71071 0.585786 9.08579C0.210714 9.46086 0 9.96957 0 10.5V12.5C0 13.0304 0.210714 13.5391 0.585786 13.9142C0.960859 14.2893 1.46957 14.5 2 14.5H4C4.53043 14.5 5.03914 14.2893 5.41421 13.9142C5.78929 13.5391 6 13.0304 6 12.5V10.5C6 9.96957 5.78929 9.46086 5.41421 9.08579C5.03914 8.71071 4.53043 8.5 4 8.5H2ZM8 2.5C8 1.96957 8.21071 1.46086 8.58579 1.08579C8.96086 0.710714 9.46957 0.5 10 0.5H12C12.5304 0.5 13.0391 0.710714 13.4142 1.08579C13.7893 1.46086 14 1.96957 14 2.5V4.5C14 5.03043 13.7893 5.53914 13.4142 5.91421C13.0391 6.28929 12.5304 6.5 12 6.5H10C9.46957 6.5 8.96086 6.28929 8.58579 5.91421C8.21071 5.53914 8 5.03043 8 4.5V2.5ZM8 10.5C8 9.96957 8.21071 9.46086 8.58579 9.08579C8.96086 8.71071 9.46957 8.5 10 8.5H12C12.5304 8.5 13.0391 8.71071 13.4142 9.08579C13.7893 9.46086 14 9.96957 14 10.5V12.5C14 13.0304 13.7893 13.5391 13.4142 13.9142C13.0391 14.2893 12.5304 14.5 12 14.5H10C9.46957 14.5 8.96086 14.2893 8.58579 13.9142C8.21071 13.5391 8 13.0304 8 12.5V10.5Z"
            fill="#90A4AE"
          />
        </svg>
        <a href="#explore-menu" className="flex items-center">
          Menu
        </a>
      </Typography>
      <Typography
        as="li"
        variant="menu"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >

        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
            fill="#90A4AE"
          />
        </svg>
        <a href="#footer" className="flex items-center">
          Contact Us
        </a>
      </Typography>

    </ul>
  );
 
  return (
    <Navbar shadow="false"  color="white" className="mx-auto -mt-4 mb-6 sticky top-5 z-10 max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 shadow-none">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          <img src="https://res.cloudinary.com/drts3ztiy/image/upload/v1730352696/kojritvivoor3jpmqmzs_e_background_removal_f_png_c5smz7.png"  className="w-36 h-12  object-cover " alt="" />
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-4">
          <div className="relative">
            <Link to='/cart'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

            </Link>
            <div className={`${getTotalPrice() > 0 ? '' : 'hidden'} dot absolute min-w-[10px] min-h-[10px] bg-[#ff6347] rounded-full top-[-8px] right-[-8px]`}>

            </div>
          </div>
          <div className=" items-center gap-x-1 hidden lg:flex">
          {
  !token ? (
    <>
      <Button fullWidth variant="text" size="md" onClick={() => loginHandler()}>
        <span>Log In</span>
      </Button>
      <Button fullWidth variant="" size="md" onClick={() => signinHandler()} className="bg-[tomato]">
        <span>Sign in</span>
      </Button>
    </>
  ) : (
    <>
      {/* Profile dropdown and Logout button side by side */}

        {/* Dropdown for profile */}
        <Menu>
        <MenuHandler>
        <Button
        fullWidth
          variant="text"
          color="blue-gray"
          className="flex items-center  gap-1 rounded-md py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="md"
            alt={user?.name}
            className="border border-gray-900 p-0.5  object-fill"
            src="https://res.cloudinary.com/drts3ztiy/image/upload/v1730324855/wnw534mdphozpipgcru0.jpg"
          />
          
        </Button>
      </MenuHandler>
          {/* <MenuList>
            <MenuItem className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

              <Link to="/profile">Edit Profile</Link>
              
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

              <Link to="/orders">Orders</Link>
            </MenuItem>
          </MenuList> */}
        </Menu>
        
        {/* Logout Button */}
        <Button fullWidth variant="" size="md" onClick={logout} className="bg-[tomato]">
          <span>Logout</span>
        </Button>

    </>
  )
}
</div>

        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
           
          {
  !token ? (
    <>
      <Button fullWidth variant="text" size="md" onClick={()=>loginHandler()}>
        <span>Log In</span>
      </Button>
      <Button fullWidth variant="" size="md" onClick={() => signinHandler()} className="bg-[tomato]">
        <span>Sign in</span>
      </Button>
    </>
  ) : (
    <>
      {/* Profile dropdown and Logout button side by side */}

        {/* Dropdown for profile */}
        <Menu>
        <MenuHandler>
        <Button
        fullWidth
          variant="text"
          color="blue-gray"
          className="flex items-center  gap-1 rounded-md py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt={user?.name}
            className="border border-gray-900 p-0.5  object-fill"
            src="https://res.cloudinary.com/drts3ztiy/image/upload/v1730324855/wnw534mdphozpipgcru0.jpg"
          />
         Hi, 👋 {" "}
         {
          user?.name
         }
        </Button>
      </MenuHandler>
          {/* <MenuList>
            <MenuItem className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>

              <Link to="/profile">Edit Profile</Link>
              
            </MenuItem>
            <MenuItem className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

              <Link to="/orders">Orders</Link>
            </MenuItem>
          </MenuList> */}
        </Menu>
        
        {/* Logout Button */}
        <Button fullWidth variant="" size="md" onClick={logout} className="bg-[tomato]">
          <span>Logout</span>
        </Button>

    </>
  )
}
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}