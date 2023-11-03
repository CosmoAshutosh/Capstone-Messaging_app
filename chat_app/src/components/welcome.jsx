import React from "react";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useSignInWithGoogle, useSignInWithGithub, useSignInWithFacebook, useSignInWithTwitter } from "react-firebase-hooks/auth";
import { auth } from "./Firebase/firebase";

function Welcome() {

     const [signInWithGoogle, Googleuser, Googleloading, Googleerror] = useSignInWithGoogle(auth);
     const [signInWithGithub, Githubuser, Githubloading, Githuberror] = useSignInWithGithub(auth);
     const [signInWithFacebook, Facebookuser, Facebookloading, Facebookerror] = useSignInWithFacebook(auth);
     const [signInWithTwitter, Twitteruser, Twitterloading, Twittererror] = useSignInWithTwitter(auth);

     return (
          <div className="welcome-container" >
               <Paper elevation={8} sx={{ margin: 'auto', backgroundColor: 'transparent', width: '500px', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <div className="loginIcon">
                         <img src="https://img.freepik.com/free-vector/gradient-quill-pen-design-template_23-2149837194.jpg?w=740&t=st=1697582801~exp=1697583401~hmac=8841801666034a0a70215399908ce036ed0ce87530297748c3f311927d30dbf9"
                              alt="logo">
                         </img>
                    </div>
                    <div className="loginOptions">
                         <Button variant="outlined" onClick={() => signInWithGoogle()} >
                              Login with Google
                         </Button>

                         <Button variant="outlined" onClick={() => signInWithGoogle()} >
                              Login with Facebook
                         </Button>

                         <Button variant="outlined" onClick={() => signInWithGoogle()} >
                              Login with Github
                         </Button>

                         <Button variant="outlined" onClick={() => signInWithGoogle()} >
                              Login with Twitter
                         </Button>
                    </div>
               </Paper>
          </div>
     );
}

export default Welcome;