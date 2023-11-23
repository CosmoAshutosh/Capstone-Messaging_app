import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../Firebase/firebase";

function useAuthUser() {
     const [user] = useAuthState(auth);

     useEffect (() => {
          if(user) {

               const userRef = doc(db, `Users/${user.uid}`);
               getDoc(userRef).then(snapshot => {
                    if(!snapshot.exists()){
                         setDoc(snapshot.ref, {
                              name: user.displayName,
                              photoURL: user.photoURL,
                              timestamp: serverTimestamp()
                         });
                    }
               });
          }
     }, [user]);
}

export default useAuthUser ;