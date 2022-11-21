import React from 'react'
import backIMG from '../img/download-Background.jpg';
import './Action.css';

const Action = ({ fileName, fileSize }) => {
   const downloadHandler= () => {}
	return (
      <div className="action">
            <div className="download">
                  <img className='image' src={backIMG} alt='download' />
            </div>
            <div className='container'>
               <h2>Your file is ready to download</h2>
               <p>Link expires in 24 hours</p>
               <div className='downloadInfo'>
                  <h4>{fileName}</h4>
                  <small>{parseInt(fileSize / 1000)} KB</small>
               </div>
               <button onclick={downloadHandler} className='btn'>Download</button>
            </div>
      </div>
	);
};

export default Action