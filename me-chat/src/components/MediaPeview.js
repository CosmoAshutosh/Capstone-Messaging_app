import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

function MediaPreview({ src, closePreview }) {

     if (!src) return null;

     return (
          <div className="mediaPreview">
               <CloseIcon onClick={closePreview} />
               <img src={src} alt='Preview' />
          </div>
     )
}

export default MediaPreview;