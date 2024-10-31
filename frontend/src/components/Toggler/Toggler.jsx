
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

function ToggleSwitch() {
  const { isDarkTheme, toggleTheme } = useTheme();

  console.log(isDarkTheme);

  return (
    <label className="relative inline-block w-[3.5em] h-[2em] cursor-pointer">
      <input
        type="checkbox"
        onChange={toggleTheme} 
       
         
        className="opacity-0 w-0 h-0"
      />
      <span
        className={`absolute inset-0 rounded-full transition duration-500 ${
          !isDarkTheme ? 'bg-[#5494de]' : 'bg-[#20262c]'
        }`}
      />
      <span
        className={`absolute h-[1.4em] w-[1.4em] rounded-full left-[10%] bottom-[15%] transition-transform duration-500 ${
          !isDarkTheme
            ? 'translate-x-full shadow-[inset_15px_-4px_0_15px_#efdf2b,0px_0px_10px_0px_#efdf2b]'
            : 'shadow-[inset_8px_-4px_0_0px_#ececd9,-4px_1px_4px_0px_#dadada]'
        }`}
        style={{ backgroundColor: !isDarkTheme ? '#efdf2b' : '#20262c' }}
      />
      <span
        className={`absolute top-[15%] right-[20%] h-[2px] w-[2px] rounded-full transition-all duration-500 backdrop-blur ${
          !isDarkTheme
            ? 'transform -translate-x-[20px] w-[10px] h-[10px] bg-white shadow-[-12px_0_0_white,-6px_0_0_1.6px_white,5px_15px_0_1px_white,1px_17px_0_white,10px_17px_0_white]'
            : 'bg-[#e5f041e6] shadow-[-7px_10px_0_#e5f041e6,8px_15px_0_#e5f041e6,-17px_1px_0_#e5f041e6,-20px_10px_0_#e5f041e6,-7px_23px_0_#e5f041e6,-15px_25px_0_#e5f041e6]'
        }`}
      />
    </label>
  );
}

export default ToggleSwitch;
