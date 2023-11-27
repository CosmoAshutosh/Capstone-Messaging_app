import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "src/utils/firebase";


function useChats(user) {
     const [snapshot] = useCollection(query(collection(db, `users/${user.uid}/chats`), orderBy('timestamp', 'desc')));

     const chats = snapshot?.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
     }));
     return chats;
}

export default useChats;