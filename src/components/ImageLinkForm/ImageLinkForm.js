import React from 'react';
import './ImageLinkForm.css';

const ImageLinkFrom = ({onInput, onSubmit}) => {
	return (
		<div className="form">
			<div className="intro f4">
				{
					'This Magic Brain will detect faces in your pictures. Give it a try. '
				}
			</div>
			<div className="dataInput">
				<input onChange={onInput} className="f4" placeholder="Paste your image link here *.jpg" type="text"/>
				<button onClick={onSubmit} className="f4 grow pv2 dib pointer">Detect</button>
			</div>
		</div>
	)
}

export default ImageLinkFrom;