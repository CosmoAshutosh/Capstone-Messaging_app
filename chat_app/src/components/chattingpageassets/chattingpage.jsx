import React, { useState } from "react";
import Searchbar from "./Searchbar";
import { Grid, AppBar, Avatar, Tab, Tabs, Tooltip, Typography, TextField } from "@mui/material";
import MicSharpIcon from '@mui/icons-material/MicSharp';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';

function Chattingpage() {

     const [value, setValue] = useState(0);

     function handleChange(event, newValue) {
          setValue(newValue)
     }

     return (
          <Grid container>

               <Grid item xs={4} sx={{ height: '100vh', padding: '0' }}>

                    <div className="profile" style={{ backgroundColor: '#F0EEF0', padding: '10px' }}>
                         <AppBar position="static" sx={{ gap: '20px', backgroundColor: "transparent", boxShadow: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Tooltip title="User">
                                   <Avatar src="/broken-image.jpg" />
                              </Tooltip>
                              <Typography variant="h6" component="div" sx={{ color: 'black' }}>
                                   Ashutosh Mishra
                              </Typography>
                         </AppBar>
                    </div>

                    <div className="usersearch roomsearch" style={{ backgroundColor: '#F9F8FB', padding: '10px' }}>
                         <Searchbar />

                    </div>

                    <div className="user-room" style={{ backgroundColor: '#F0EEF0' }}>
                         <Tabs value={value} onChange={handleChange} sx={{ width: '100%' }}>
                              <Tooltip title="Home">
                                   <Tab icon={<HomeIcon />} sx={{ width: '164.66px' }} />
                              </Tooltip>
                              <Tooltip title="Public Room">
                                   <Tab icon={<GroupsIcon />} sx={{ width: '164.66px' }} />
                              </Tooltip>
                              <Tooltip title="Personal chat">
                                   <Tab icon={<PersonIcon />} sx={{ width: '164.66px' }} />
                              </Tooltip>
                         </Tabs>

                    </div>

               </Grid>

               <Grid item xs={8} sx={{ height: '100vh', padding: '0' }}>
               
                    <div className="chating-profile" style={{ backgroundColor: 'wheat', padding: '10px' }}>
                         <AppBar position="static" sx={{ gap: '20px', backgroundColor: "transparent", boxShadow: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Avatar src="/broken-image.jpg" />
                              <Typography variant="h6" component="div" sx={{ color: 'black' }}>
                                   Cecil Ekka
                              </Typography>
                         </AppBar>
                    </div>
                    <div className="chatbackground">

                         <div>
                              <TextField id="outlined-basic" variant="outlined" sx={{width:"100%"}} />
                              <MicSharpIcon />
                         </div>
                         
                    </div>

               </Grid>

          </Grid>
     );
}

export default Chattingpage;