import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({imageSource, box}) => {
  let boundingBoxes = null;
  console.log(imageSource);
  if(!(Object.keys(box).length === 0 && box.constructor === Object)){
    boundingBoxes = box.map(face => (
      <div>
      <div className='bounding-box' style={{top: face.topRow, right: face.rightCol, bottom: face.bottomRow, left: face.leftCol}}>
      </div>
    
      </div>

    ))
  }

  return (
    <div className='result'>
      <div className='mt2'>
        <img id='inputImage' alt='' src={imageSource} width='500px' heigh='auto'/>
        {boundingBoxes}        
      </div>
    </div>
  );
}
export default FaceRecognition;