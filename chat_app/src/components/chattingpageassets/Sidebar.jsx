import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Tooltip } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from "react";
import SidebarTabs from "./SidebarTabs";
import SidebarList from "./SidebarList";

const tabs = [{
     id: 1,
     icon: <Home />,
},
{
     id: 2,
     icon: <Message />,
},
{
     id: 3,
     icon: <PeopleAlt />,
},
];

function Sidebar(user) {

     const [menu, setMenu] = useState(1)
     const data = [{
          id: 1,
          name: "Cecil Ekka",
          photoURL: "none"
     }]

     return (
          <div className="sidebar">
               <div className="sidebar__header">
                    <div className="sidebar__header--left">
                         <Tooltip title="User">
                              <Avatar src={user.photoURL} alt={user.displayName} />
                              <h4>{user.displayName}</h4>
                         </Tooltip>
                    </div>
                    <div className="sidebar__header--right">
                         <IconButton>
                              <ExitToAppIcon />
                         </IconButton>
                    </div>
               </div>
               <div className="sidebar__search">
                    <form className="sidebar__search-container">
                         <input
                              type="text"
                              id="search"
                              placeholder="Seaarch for user or rooms"
                         />
                    </form>
               </div>

               <div className="sidebar__menu">
                    {tabs.map(tab => (
                         <SidebarTabs key={tab.id} onClick={() => setMenu(tab.id)} isActive={tab.id === menu}>
                              <div className="sidebar__menu--home">
                                   {tab.icon}
                                   <div className="sidebarr__menu--line">

                                   </div>
                              </div>
                         </SidebarTabs>
                    ))}

               </div>

               {menu === 1 ? (
                    <SidebarList title="Chats" data={data} />
               ) : menu === 2 ? (
                    <SidebarList title="Rooms" data={data} />
               ) : menu === 3 ? (
                    <SidebarList title="Users" data={data} />
               ) : menu === 4 ? (
                    <SidebarList title="Search Result" data={data} />
               ) : null
               }

               <div className="sidebar__chat--addRooms">
                    <IconButton>
                         <AddIcon />
                    </IconButton>
               </div>

               <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                         <DialogContentText>
                              To subscribe to this website, please enter your email address here. We
                              will send updates occasionally.
                         </DialogContentText>
                         <TextField
                              autoFocus
                              margin="dense"
                              id="name"
                              label="Email Address"
                              type="email"
                              fullWidth
                              variant="standard"
                         />
                    </DialogContent>
                    <DialogActions>
                         <Button onClick={handleClose}>Cancel</Button>
                         <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
               </Dialog>
          </div>
     )
}

export default Sidebar;