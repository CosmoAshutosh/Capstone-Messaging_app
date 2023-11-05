import React from "react";
import Sidebar from "./Sidebar";
import { Grid, AppBar, Avatar, Typography, TextField } from "@mui/material";
import MicSharpIcon from '@mui/icons-material/MicSharp';


function Chattingpage(props) {

     return (
          <Grid container>

               {/* sidebar in main profile */}
               <Sidebar users={props.user} />

               <Grid item xs={8} sx={{ height: '100vh', padding: '0' }}>

                    <div className="chating-profile">
                         <AppBar position="static" sx={{ gap: '20px', backgroundColor: "transparent", boxShadow: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                              <Avatar src="/broken-image.jpg" />
                              <Typography variant="h6" component="div" sx={{ color: 'black' }}>
                                   Cecil Ekka
                              </Typography>
                         </AppBar>
                    </div>
                    <div className="chatbackground">

                         <div>
                              <TextField id="outlined-basic" variant="outlined" sx={{ width: "100%" }} />
                              <MicSharpIcon />
                         </div>

                    </div>

               </Grid>

          </Grid>
     );
}

export default Chattingpage;