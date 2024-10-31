import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import {
  PlusCircleIcon,
  ListBulletIcon
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
 
export default function VerticalTabsWithIcon() {
  const [activeTab, setActiveTab] = useState('/');

  const data = [
    {
      label: "Add",
      value: "/add",
      icon: PlusCircleIcon,
    },
    {
      label: "List Items",
      value: "/list",
      icon: ListBulletIcon,
    },
    // {
    //   label: "Orders",
    //   value: "/orders",
    //   icon: ListBulletIcon,
    // },
  ];

  return (
    <div className="flex justify-center">
      <Tabs value={activeTab} className="">
        <TabsHeader className="flex flex-row gap-12 mt-9">
          {data.map(({ label, value, icon }) => (
            <NavLink 
              to={activeTab === value ? '/' : value} 
              key={value} 
              onClick={() => setActiveTab(activeTab === value ? '/' : value)}
            >
              <Tab key={value} value={value} className="place-items-start">
                <div className="flex items-center gap-2">
                  {React.createElement(icon, { className: "w-5 h-5" })}
                  {label}
                </div>
              </Tab>
            </NavLink>
          ))}
        </TabsHeader>
      </Tabs>
    </div>
  );
}
