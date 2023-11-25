import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";


function useChatMessages(roomId) {

     const [snapshot] = useCollection(roomId ? query(
          collection(db, `rooms/${roomId}/messages`), orderBy("timestamp", "asc")
     ) : null);

     const messages = snapshot?.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
     }));

     return messages;
}

export default useChatMessages;