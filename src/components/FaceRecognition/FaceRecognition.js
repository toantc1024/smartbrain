import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({imageSource, box}) => {
  return (
    <div className='result'>
      <div className='mt2'>
        <img id='inputImage' alt='' src={imageSource} width='500px' heigh='auto'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>
        </div>
      </div>
    </div>
  );
}
export default FaceRecognition;