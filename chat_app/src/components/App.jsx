import React from "react";
import Welcome from "./welcome";
import useAuthUser from "./hooks/useAuthuser";
import Sidebar from "./chattingpageassets/Sidebar";

function App() {

     const user = useAuthUser();

     if (!user) return <Welcome />

     return (
          <div className="app">
               <div className="app__body">
                    <Sidebar user = {user}/>
               </div>
          </div>
     )
}

export default App; 