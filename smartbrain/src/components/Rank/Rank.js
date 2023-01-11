import React from 'react';
import './Rank.css';

const Rank = ({name, entries}) => {
	return (
		<div className="rank">
			<div> 
			{`${name}, your current entry count is...`}
			</div>
			<div className="ranking grow pointer shadow-5">
			{`#${entries}`}
			</div>
		</div>
	)
}

export default Rank;