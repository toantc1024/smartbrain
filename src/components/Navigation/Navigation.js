import React from 'react';
import Logo from '../Logo/Logo';
import './Navigation.css';


const Navigation = () => {
	return (
		<nav>
			<Logo />
			<div>
				<a className="f5 pa3 pointer ma3">Sign out</a>
				<a className="f5 pa3 pointer ma3">Sign out</a>
			</div>
		</nav>
	)
}

export default Navigation;