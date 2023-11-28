import { CircularProgress } from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SidebarListItems from "./SidebarListItems";
import React from "react";

function SidebarList({ title, data }) {
     if (!data) {
          return (
               <div className="loader__container sidebar__loader">
                    <CircularProgress />
               </div>
          )
     }

     if (!data.length && title === "Search Result") {
          return (
               <div className="no-result">
                    <div>
                         <SearchOffIcon />
                    </div>
                    <h2>No {title}</h2>
               </div>
          )
     }

     return (
          <div className="sidebar__chat--container" >
               <h2>{title}</h2>
               {data.map(item => (
                    <SidebarListItems key={item.id} item={item} />
               ))}
          </div>
     )
}

export default SidebarList;