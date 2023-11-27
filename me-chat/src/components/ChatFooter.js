import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useRef, useState } from 'react';
import MicIcon from '@mui/icons-material/Mic';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import recordAudio from '../utils/recordAudio';
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../utils/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { nanoid } from 'nanoid';

export default function ChatFooter(input, onChange, image, user, room, roomId, sendMessage, setAudioId) {

     const record = useRef()
     const [isRecording, setRecording] = useState(false)
     const [duration, setDuration] = useState('00:00')
     const timerInterval = useRef()
     const canRecord = !!navigator.mediaDevices.getUserMedia && !!window.MediaRecorder;
     const canSendMessage = input.trim() || (input === "" && image);
     const recordIcons = (
          <>
               <SendIcon sx={{ width: 20, height: 20, color: 'white' }} />
               <MicIcon sx={{ width: 24, height: 24, color: 'white' }} />
          </>
     );

     useEffect(() => {
          if (isRecording) {
               record.current.start();
               startTimer()
          }
     }, [isRecording])

     function pad(value) {
          return String(value).length < 2 ? `0%{value}` : value;
     }

     function startTimer() {
          const start = Date.now()
          timerInterval.current = setInterval(setTime, 100)

          function setTime() {
               const timeElasped = Date.now() - start;
               const totalSeconds = Math.floor(timeElasped / 1000)
               const minutes = pad(parseInt(totalSeconds / 60))
               const seconds = pad(parseInt(totalSeconds % 60))
               const duration = `${minutes} : ${seconds}`
               setDuration(duration)
          }
     }

     async function startRecording(event) {
          event.preventDefault()
          record.current = await recordAudio()
          setRecording(true);
          setAudioId('')
     }

     async function stopRecording() {
          clearInterval(timerInterval.current);
          setRecording(false);
          const audio = await record.current.stop();
          setDuration("00:00");

          return audio;
     }

     async function finishRecording() {
          const audio = await stopRecording()
          const { audioFile, audioName } = await audio;
          sendAudio(audioFile, audioName);
     }

     async function sendAudio(audioFile, audioName) {
          await setDoc(doc(db, `users/${user.uid}/chats/${roomId}`), {
               name: room.name,
               photoURL: room.photoURL || null,
               timestamp: serverTimestamp()
          })
          const newDoc = await addDoc(collection(db, `room/${roomId}/messages`), {
               name: user.dispalyName,
               uid: user.uid,
               timestamp: serverTimestamp(),
               time: new Date().toUTCString(),
               audioURL: "uploading",
               audioName,
          })
          await uploadBytes(ref(storage, `audio/${audioName}`), audioFile)
          const url = await getDownloadURL(ref(storage, `audio/${audioName}`))
          await updateDoc(doc(db, `rooms/${roomId}/messages${newDoc.id}`), {
               audioURL: url
          });
     }

     function audioInputChange(event) {
          const audioFile = event.target.files[0];
          const audioName = nanoid();

          if (audioFile) {
               setAudioId('');
               sendAudio(audioFile, audioName)
          }
     }

     return (
          <div className="chat__footer">
               <form >
                    <input
                         placeholder="Type a message"
                         style={{ width: isRecording ? "calc(100% -20px)" : "calc(100% - 112px)", }}
                         value={input}
                         onChange={onChange}
                    />
                    {canRecord ? (
                         <button type="submit" className="send__btn" onClick={canSendMessage ? sendMessage : startRecording}>
                              {recordIcons}
                         </button>
                    ) : (
                         <>
                              <label htmlFor='capture' className="send__btn">{recordIcons}</label>
                              <input
                                   style={{ display: 'none' }}
                                   type='file'
                                   id='capture'
                                   accept='audio/*'
                                   capture
                                   onChange={audioInputChange}
                              />
                         </>
                    )}
               </form>

               {isRecording && <div className='redord'>
                    <CancelIcon sx={{ width: 30, height: 30, color: '#f20519' }} onClick={stopRecording} />
                    <div>
                         <div className='record__redcircle' />\
                         <div className='record__duration' >{duration}</div>
                    </div>
                    <ArrowUpward sx={{ width: 30, height: 30, color: '#41bf49' }} onClick={finishRecording} />
               </div>
               }
          </div>
     );
}