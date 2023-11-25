import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../Firebase/firebase";


function useUsers(user) {
     const [snapshot] = useCollection(query(collection(db, "rooms"), orderBy('timestamp', 'desc')));

     const users = [];

     snapshot?.docs.forEach(doc => {
          const id = doc.id > user.uid ? `${doc.id}${user.uid}` : `${user.uid}${doc.id}`;

     if (doc.id !== user.uid){
          users.push({id, ...doc.data() });
     }


     });
     return users;
}

export default useUsers;