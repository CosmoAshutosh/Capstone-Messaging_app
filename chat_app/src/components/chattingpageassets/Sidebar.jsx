import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from "react";
import SidebarTabs from "./SidebarTabs";
import SidebarList from "./SidebarList";
import { useRouter } from "next/router";
import { addDoc, collection, getDocs, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase";
import useRooms from "../hooks/useRooms";
import useUsers from "../hooks/useUsers";
import useChats from "../hooks/useChats";
import Public from "@mui/icons-material/Public";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';


const tabs = [{
     id: 1,
     icon: <HomeIcon />,
},
{
     id: 2,
     icon: <Public />,
},
{
     id: 3,
     icon: <PeopleAltIcon />,
},
];

export default function Sidebar({ user }) {

     const [menu, setMenu] = useState(1);
     const [isCreatingRoom, setCreatingRoom] = useState(false);
     const [searchResults, setSearchResults] = useState([]);
     const [roomName, setroomName] = useState('');
     const router = useRouter();
     const rooms = useRooms();
     const users = useUsers(users);
     const chats = useChats(users)


     async function createRoom() {
          if (roomName?.trim()) {
               const roomsRef = collection(db, 'rooms')
               const newRoom = await addDoc(roomsRef, {
                    name: roomName,
                    timestamp: serverTimestamp()
               })
               setCreatingRoom(false);
               setroomName("");
               setMenu(2);
               router.push(`/?roomId = ${newRoom.id}`)
          }
     };

     async function searchUsersAndRooms(event) {
          event.preventDefault();
          const searchValue = event.target.elements.search.value
          const userQuery = query(collection(db, 'users'), where("name", "==", searchValue))
          const roomQuery = query(collection(db, 'rooms'), where("name", "==", searchValue))
          const userSnapshot = await getDocs(userQuery)
          const roomSnapshot = await getDocs(roomQuery)

          const userResults = userSnapshot?.docs.map(doc => {
               const id = doc.id > user.uid ? `${doc.id}${user.uid}` : `${user.uid}${doc.id}`;
               return { id, ...doc.data() }

          });

          const roomResults = roomSnapshot?.docs.map((doc) => ({
               id: doc.id,
               ...doc.data(),
          }));

          const searchResults = [...userResults, ...roomResults];
          setMenu(4)
          setSearchResults(searchResults);
     }

     return (
          <div className="sidebar">
               <div className="sidebar__header">
                    <div className="sidebar__header--left">
                         <Avatar src={users.photoURL} alt={users.displayName} />
                         <h4>{users.displayName}</h4>
                    </div>
                    <div className="sidebar__header--right">
                         <IconButton onClick={() => auth.signOut()}>
                              <ExitToAppIcon />
                         </IconButton>
                    </div>
               </div>
               <div className="sidebar__search">
                    <form onSubmit={searchUsersAndRooms} className="sidebar__search-container">
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
                    <SidebarList title="Chats" data={chats} />
               ) : menu === 2 ? (
                    <SidebarList title="Rooms" data={rooms} />
               ) : menu === 3 ? (
                    <SidebarList title="Users" data={users} />
               ) : menu === 4 ? (
                    <SidebarList title="Search Result" data={searchResults} />
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
     );
}