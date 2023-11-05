import React from "react";
import Chattingpage from "./chattingpageassets/chattingpage";
import Welcome from "./welcome";
import useAuthUser from "./hooks/useAuthuser";

function App() {

     const user = useAuthUser();

     if (!user) return <Welcome />

     return (
          <Chattingpage user={user} />
     )
}

export default App; 