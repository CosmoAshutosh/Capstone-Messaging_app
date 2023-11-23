import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from "react";
import SidebarTabs from "./SidebarTabs";
import SidebarList from "./SidebarList";
import Home from "./Home";
import Message from "./Message";
import PeopleAlt from "./PeopleAlt";



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

function Sidebar({users}) {

     const [menu, setMenu] = useState(1)
     const [isCreatingRoom, setCreatingRoom] = useState(false)
     const [roomName, setroomName] = useState('')
     const data = [{
          id: 1,
          name: "Cecil Ekka",
          photoURL: "none"
     }]

     async function createRoom() {
          
     }

     return (
          <div className="sidebar">
               <div className="sidebar__header">
                    <div className="sidebar__header--left">
                         <Avatar src={users.photoURL} alt={users.displayName} />
                         <h4>{users.displayName}</h4>
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
                    <IconButton onClick={() => setCreatingRoom(true)}>
                         <AddIcon />
                    </IconButton>
               </div>

               <Dialog open={isCreatingRoom} onClose={() => setCreatingRoom(false)}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                         <DialogContentText>
                              Type the name of your public room. Every user will be able to join the room
                         </DialogContentText>
                         <TextField
                              autoFocus
                              onChange={event => setroomName(event.target.value)}
                              value={roomName}
                              margin="dense"
                              id="roomName"
                              label="Room name"
                              type="text"
                              fullWidth
                              variant="standard"
                         />
                    </DialogContent>
                    <DialogActions>
                         <Button color="error" onClick={() => setCreatingRoom(false)}>Cancel</Button>
                         <Button color="success" onClick={createRoom}>Submit</Button>
                    </DialogActions>
               </Dialog>
          </div>
     )
}

export default Sidebar;