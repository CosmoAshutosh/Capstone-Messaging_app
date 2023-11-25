import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import MicIcon from '@mui/icons-material/Mic';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowUpward from '@mui/icons-material/ArrowUpward';

export default function ChatFooter(input, onChange, image, user, room, roomId, sendMessage) {

          const canRecord = true;
          const isRecording = true;
          const canSendMessage = input.trim() || (input === "" && image)
          const recordIcons = (
               <>
                    <SendIcon sx={{ width: 20, height: 20, color: 'white' }} />
                    <MicIcon sx={{ width: 24, height: 24, color: 'white' }} />
               </>
          )

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
               <button type="submit" className="send__btn" onClick={canSendMessage ? sendMessage : () => null}>
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
                         />
                    </>
               )}
          </form>

          {isRecording && <div className='redord'>
               <CancelIcon sx={{ width: 30, height: 30, color: '#f20519' }} />
               <div>
                    <div className='record__redcircle' />\
                    <div className='record__duration' >0:00</div>
               </div>
               <ArrowUpward sx={{ width: 30, height: 30, color: '#41bf49' }} />
          </div>
          }
     </div>
);
}