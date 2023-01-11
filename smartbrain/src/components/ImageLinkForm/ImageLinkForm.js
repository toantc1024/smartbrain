import React from 'react';
import './ImageLinkForm.css';

const ImageLinkFrom = ({busyLoading, onInput, onSubmit}) => {
	return (
		<div className="form">
			<div className="intro f4">
				{
					'This Magic Brain will detect faces in your picture. Give it a try. '
				}
			</div>
			<div className="dataInput">
				<input onChange={onInput} className="f4" placeholder="Paste your image link here *.jpg" type="text"/>
				<button onClick={onSubmit} className="f4  pv2 dib pointer">
					<span>Detect</span>
					{

						busyLoading
						? <span>ing... </span>
						: null
					}
				</button>
			</div>
		</div>
	)
}

export default ImageLinkFrom;