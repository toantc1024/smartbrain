import React, { Component } from 'react';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'registerName': '',
			'registerEmail': '',
			'registerPassword': ''
		}
	}

	onEmailChange = (event) => {
		this.setState({
			registerEmail: event.target.value
		})
	}	

	onNameChange = (event) => {
		this.setState({
			registerName: event.target.value
		})
	}

	onPasswordChange = (event) => {
		this.setState({
			registerPassword: event.target.value
		})
	}

	onSubmitRegister = () => {
		fetch('http://localhost:4000/register', {
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
				email: this.state.registerEmail,
				password: this.state.registerPassword,
				name: this.state.registerName
			})
		  })
		  	.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.onRouteChange('home');
				}
			})
			.catch(console.log)
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="ba dark-gray b--white-10 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
				<main className="pa4 black-80">
				<div className="measure">
					<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					<legend className="f3 fw6 ph0 mh0">Register</legend>
					<div className="mt3">
						<label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
						<input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent  hover-white w-100" type="name" name="name"  id="name" />
					</div>
					<div className="mt3">
						<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
						<input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent  hover-white w-100" type="email" name="register-email-address"  id="register-email-address" />
					</div>
					<div className="mv3">
						<label className="db fw6 lh-copy f6" htmlFor="register-password">Password</label>
						<input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-white w-100" type="password" name="register-password"  id="register-password" />
					</div>
					{/*<label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" className="bg-transparent " /> Remember me</label>*/}
					</fieldset>
					<div className="">
					<input 
						onClick={this.onSubmitRegister}
						className="b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib" 
						type="submit" 
						value="Register" 
					/>
					</div>
					<div className="lh-copy mt3">
					<a onClick={() => onRouteChange('signin')} className="f6 pointer dim black db">Sign in</a>
					</div>
				</div>
				</main>
			</article>
		)
	}
}
export default Register;