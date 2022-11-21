import React from 'react';
import './Navbar.css';

const Navbar = () => {
	return (
		<React.Fragment>
			<nav className="navbar">
				<h1 className="logo">ShareME</h1>
				{/* <ul className="nav-links">
					<li key="a" className="nav-link">
						Register / Sign Up
					</li>
					<li key="b" className="nav-link">
						Log In
					</li>
				</ul> */}
			</nav>
		</React.Fragment>
	);
};

export default Navbar;
