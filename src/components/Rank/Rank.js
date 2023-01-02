import React from 'react';
import './Rank.css';

const Rank = () => {
	return (
		<div className="rank">
			<div> 
			{"Andrei, your current rank is ..."}
			</div>
			<div className="ranking grow pointer shadow-5">
			{"#3"}
			</div>
		</div>
	)
}

export default Rank;