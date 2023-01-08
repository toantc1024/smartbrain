import React from 'react';

const Register = ({ onRouteChange }) => {
	return (
		<article className="ba dark-gray b--white-10 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f3 fw6 ph0 mh0">Register</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input className="pa2 input-reset ba bg-transparent  hover-white w-100" type="name" name="name"  id="name" />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent  hover-white w-100" type="email" name="register-email-address"  id="register-email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="register-password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-white w-100" type="password" name="register-password"  id="register-password" />
			      </div>
			      {/*<label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" className="bg-transparent " /> Remember me</label>*/}
			    </fieldset>
			    <div className="">
			      <input 
			   		onClick={() => onRouteChange('home')}
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
	);
}

export default Register;