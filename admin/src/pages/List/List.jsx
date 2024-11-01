import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';


const List = () => {
  const [list, setList] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    fetchList(); 
  }, []);

  const fetchList = async () => {
    setLoading(true);
      const res = await axios.get('https://bitez.onrender.com/api/food/list');
      setLoading(false);
      console.log(res.data);
      setList(res.data);
  };

  const handleClick = async (id) => {
    setLoading(true);
    const res = await axios.post(`https://bitez.onrender.com/api/food/remove`,{id:id});
    await fetchList();
    setLoading(false);
    if(res.data.success){
      toast.success(res.data.message);
    }
    else{
      toast.error("Error");
    }
  };


  return (
    <div className='px-24 h-screen dark:text-white'>
      <div>

        {
          loading &&(
            <div className='absolute top-1/2 left-1/2'>
              <Loader />
            </div>
          )
        }
        <h1 className='text-3xl mt-8'>All Food List</h1>
      </div>
      <div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
-
            </tr>
          </thead>
          <tbody>
            {list.map((item, idx) => (
              <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <img src={item.image} alt={item.name} className="h-12 w-12 object-cover" />
                </th>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className='cursor-pointer' onClick={() => handleClick(item._id)}>X</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default List;
