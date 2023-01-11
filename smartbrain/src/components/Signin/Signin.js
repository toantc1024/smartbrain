import React, { Component } from 'react';
import './Signin.css';

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: '',
			problemSignIn: false
		}
 	}
	
	onEmailChange = (event) => { 
		this.setState({signInEmail: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword: event.target.value});
	}

	onSubmitSignIn = () => {
		fetch('https://smartbrain-api-kl5c.onrender.com/signin', {
			method: 'POST',
			mode: 'cors', 
			cache: 'no-cache', 
			credentials: 'same-origin', 
			headers: {
			  'Content-Type': 'application/json'
			},
			redirect: 'follow', 
			referrerPolicy: 'no-referrer', 
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		  })
		  	.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
			})
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="ba dark-gray b--white-10 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
				<main className="pa4 black-80">
				  <div className="measure">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					  <legend className="f3 fw6 ph0 mh0">Sign In</legend>
					  <div className="mt3">
						<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						<input 
							onChange={this.onEmailChange} 
							className="pa2 input-reset ba bg-transparent  hover-white w-100"
							type="email"
							name="email-address"
							id="email-address"
						/>
					  </div>
					  <div className="mv3">
						<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
						<input 
							onChange={this.onPasswordChange} 
							className="b pa2 input-reset ba bg-transparent hover-white w-100" 
							type="password" 
							name="password"  
							id="password" 
						/>
					  </div>
					  {/*<label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" className="bg-transparent " /> Remember me</label>*/}
					</fieldset>
					<div className="">
					  <input 
						   onClick={this.onSubmitSignIn}
						  className="b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib" 
						  type="submit" 
						  value="Sign in" 
					  />
					</div>
					<div className="lh-copy mt3">
					  <a onClick={() => onRouteChange('register')} className="f6 pointer dim black db">Register</a>
					</div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Signin;