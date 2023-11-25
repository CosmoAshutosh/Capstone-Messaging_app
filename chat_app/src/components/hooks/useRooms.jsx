import { db } from "../Firebase/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from 'react-firebase-hooks/firestore';

function useRooms(rooms) {
     const [snapshot] = useCollection(query(collection(db, "rooms"), orderBy('timestamp', 'desc')));

     const rooms = snapshot?.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
     }));
     return rooms;
}

export default useRooms;