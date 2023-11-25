

function useChatMessages(roomId) {

     const [snapshot] = useCollection(roomId ? query(
          collection(db, `rooms/${roomId}/messages`), orderBy("timestamp", "asc")
     ) : null);

     I
     const messages = snapshot?.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
     }));

     return messages;
}

export default useChatMessages;