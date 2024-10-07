import React, { useState } from "react";
import {
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Textarea
} from "@material-tailwind/react";
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import { assets } from '../../assets/admin_assets/assets.js';
import axios from 'axios';
import { toast } from "react-toastify";

const Add = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "" // Default category
  });

  const checkAllFields = () => {
    if (data.name && data.description && data.price && (data.category )) {
      return true;
    } else {
      return false;
      
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(!checkAllFields()) {
      toast.error("Enter all the fields");
      return;
    }

    
    setLoading(true);
    console.log("request is gone here");

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:4000/api/food/add", formData);
      if (res.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: ""
        });
        setImage(null);
        toast.success(res.data.message);
      } else {
        toast.error("Enter all the fields");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Reset loading state to false after submission
    }
  };

  const foodCategories = [
    {name:"Enter a category", icon:"🏷️"},
    { name: "Salad", icon: "🥗" },
    { name: "Rolls", icon: "🌯" },
    { name: "Desserts", icon: "🍰" },
    { name: "Sandwich", icon: "🥪" },
    { name: "Cake", icon: "🎂" },
    { name: "Pure Veg", icon: "🥦" },
    { name: "Pasta", icon: "🍝" },
    { name: "Noodles", icon: "🍜" },
  ];

  const onChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const { name, icon } = foodCategories[selectedCategory];

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuItemClick = (index) => {
    setSelectedCategory(index);
    setData((prev) => ({
      ...prev,
      category: foodCategories[index].name // Update category in data state
    }));
    setMenuOpen(false); // Close the menu when an item is selected
  };

  return (
    <div className='px-24 mb-20'>
      <form className='mt-7 space-y-9 w-3/4' onSubmit={onSubmitHandler}>
        <input
          type="file"
          hidden
          
          id='file'
          onChange={(e) => setImage(e.target.files[0])}
        />
        <h1 className='mb-4 text-semibold'>Upload Image</h1>
        <label
          className="flex items-center justify-center w-3/4 h-48 border-2 border-dashed rounded-lg border-gray-300 hover:border-gray-400 hover:bg-gray-100"
          htmlFor='file'
        >
          {image ? (
            <img src={URL.createObjectURL(image)} alt="Uploaded" className='h-32 w-auto object-cover' />
          ) : (
            <img src={assets.upload_area} alt="Upload Area" className='h-32 w-auto' />
          )}
        </label>
        <Input
          variant="static"
          label="Product Name"
          placeholder="Type here"
          name="name" // Set name attribute
          onChange={onChangeHandler}
          value={data.name}
          required
         
        />
        <Textarea
          variant="static"
          label="Product Description"
          placeholder="Type here"
          name="description" // Set name attribute
          onChange={onChangeHandler}
          value={data.description}
          required
        />
        <div className="grid grid-cols-2 gap-24">
          <div className="relative flex w-full max-w-[24rem]">
            <Menu
              placement="bottom-start"
              open={menuOpen}
              handler={handleMenuToggle}
            >
              <MenuHandler >
                <Button
                  ripple={false}
                  variant="text"
                  color="blue-gray"
                  className="bg-blue-gray-50 hover:bg-blue-gray-100 px-12 py-2 flex items-center gap-2.5 rounded-lg"
                  onClick={handleMenuToggle}
                >
                  <span className="text-lg">{icon}</span>
                  {name}
                  {menuOpen ? (
                    <ArrowUpIcon className="w-5 h-5 ml-2" />
                  ) : (
                    <ArrowDownIcon className="w-5 h-5 ml-2" />
                  )}
                </Button>
              </MenuHandler>
              <MenuList className="max-h-[20rem] max-w-[18rem]">
                {foodCategories.map(({ name, icon }, index) => (
                  <MenuItem
                    key={name}
                    className="flex items-center gap-2"
                    onClick={() => handleMenuItemClick(index)}
                  >
                    <span className="text-lg">{icon}</span>
                    {name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </div>
          <Input
            variant="static"
            label="Price"
            placeholder="Type here"
            name="price" // Set name attribute
            onChange={onChangeHandler}
            value={data.price}
            required
          />
        </div>
        <Button variant="filled" size="lg" type="submit"  loading={loading}>
          {loading ? "Adding..." : "Add"}
        </Button>
      </form>
    </div>
  );
};

export default Add;
