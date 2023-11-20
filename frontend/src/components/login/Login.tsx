import React from "react";
import LoginStyle from './Login.module.css';
import { faUser, faLock, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function LoginPage() {
  
  return (
	<div className={LoginStyle.container}>
	<div className={LoginStyle.screen}>
		<div className={LoginStyle.screen__content}>
			<form className={LoginStyle.login}>
				<div className={LoginStyle.login__field} >
					<FontAwesomeIcon icon={faUser} className={LoginStyle.login__icon} />
					<input type="text" className={LoginStyle.login__input} placeholder="User name / Email" />
				</div>
				<div className={LoginStyle.login__field}>
					<FontAwesomeIcon icon={faLock} className={LoginStyle.login__icon} />
					<input type="password" className={LoginStyle.login__input} placeholder="Password" />
				</div>
				<Link to="/area" style={{ textDecoration: "none" }}>
					<button className={`${LoginStyle.button} ${LoginStyle.login__submit}`} >
						<span className={LoginStyle.button__text}>Log In Now</span>
						<FontAwesomeIcon icon={faChevronRight} className={LoginStyle.button__icon} />
					</button>		
				</Link>		
			</form>
		</div>
		<div className={LoginStyle.screen__background}>
			<span  className={`${LoginStyle.screen__background__shape} ${LoginStyle.screen__background__shape4}`}></span>
			<span  className={`${LoginStyle.screen__background__shape} ${LoginStyle.screen__background__shape3}`}></span>
			<span  className={`${LoginStyle.screen__background__shape} ${LoginStyle.screen__background__shape2}`}></span>
			<span  className={`${LoginStyle.screen__background__shape} ${LoginStyle.screen__background__shape1}`}></span>
		</div>		
	</div>
</div>
  );
}