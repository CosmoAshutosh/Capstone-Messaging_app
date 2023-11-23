import { CircularProgress} from "@mui/material";
import SidebarListItems from "./SidebarListItems";
import React from "react";

function SidebarList({title, data}) {
     if (!data){
          return (
               <div className="loader__container sidebar__loader">
                    <CircularProgress />
               </div>
          )
     }

     return(
          <div className="sidebar__chat--addRoom" >
               <h2>{title}</h2>
               {data.map(item => (
                    <SidebarListItems key = {item.id} item = {item} />
               ))}
          </div>
     )
}

export default SidebarList;