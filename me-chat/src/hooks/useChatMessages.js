import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "src/utils/firebase";



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