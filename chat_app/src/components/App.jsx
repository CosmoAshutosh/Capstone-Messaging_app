import React from "react";
import Login from "./Login";
import useAuthUser from "./hooks/useAuthUser";
import Sidebar from "./chattingpageassets/Sidebar";

function App() {

     const user = useAuthUser();

     if (!user) return <Login />

     return (
          <div className="app">
               <div className="app__body">
                    <Sidebar users = {user}/>
               </div>
          </div>
     )
}

export default App; 