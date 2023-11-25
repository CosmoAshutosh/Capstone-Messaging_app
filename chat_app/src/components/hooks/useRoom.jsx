import { doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { useDocument } from "react-firebase-hooks/firestore";

export default function useRoom(roomId, userId) {

     const isUserRoom = roomId.includes(userId);
     const collectionId = isUserRoom ? "users" : "rooms"
     const docId = isUserRoom ? roomId.replace(userId, "") : roomId;
     const [snapshot] = useDocument(docId ? doc(db, `${collectionId}/${docId}`) : null)

     if(!snapshot?.exists()) return null;

     return{
          id: snapshot.id,
          photoURL: snapshot.photoURL || `https://avatars.dicebear.com/api/jdenticon/${snapshot.id}.svg`, ...snapshot.data(),
     }
}