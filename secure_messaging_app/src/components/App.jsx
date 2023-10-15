import React from "react";
import MessageArea from "./MesssageArea";
import SeenMessages from "./SeenMessages";
import UnseenMessages from "./UnseenMessages";

function App () {
     return (
          <div className="main-container">
               <SeenMessages />
               <MessageArea />
               <UnseenMessages />
          </div>
     );

}

export default App