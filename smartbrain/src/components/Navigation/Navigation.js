import React from 'react';
import Logo from '../Logo/Logo';
import './Navigation.css';


const Navigation = ({onRouteChange, isSignedIn}) => {
	if (isSignedIn) {
		return (
			<nav>
				<Logo />
				<div>
					<a onClick={() => onRouteChange('signout')} className="f5 pa3 pointer ma3">Sign out</a>
				</div>
			</nav>
		)
	} else {
		return (
			<nav>
				<Logo />
				<div>
					<a onClick={() => onRouteChange('signin')} className="f5 pa3 pointer ma3">Sign In</a>
					<a onClick={() => onRouteChange('register')} className="f5 pa3 pointer ma3">Register</a>
				</div>
			</nav>
		)
	}
}

export default Navigation;