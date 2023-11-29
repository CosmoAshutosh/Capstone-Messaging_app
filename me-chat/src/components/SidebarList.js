import { CircularProgress } from "@mui/material";
import SidebarListItems from "./SidebarListItems";
import React from "react";
import { NoAccounts } from "@mui/icons-material";

function SidebarList({ title, data }) {
     console.log(`Title: ${title}`);
     console.log("Data:", data);
     
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
                         <NoAccounts />
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