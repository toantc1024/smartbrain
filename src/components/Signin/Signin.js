import React from 'react';
import './Signin.css';
const Signin = ({ onRouteChange }) => {
	return (
		<article className="ba dark-gray b--white-10 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
			<main className="pa4 black-80">
			  <div className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f3 fw6 ph0 mh0">Sign In</legend>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent  hover-white w-100" type="email" name="email-address"  id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input className="b pa2 input-reset ba bg-transparent hover-white w-100" type="password" name="password"  id="password" />
			      </div>
			      {/*<label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" className="bg-transparent " /> Remember me</label>*/}
			    </fieldset>
			    <div className="">
			      <input 
			   		onClick={() => onRouteChange('home')}
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

export default Signin;