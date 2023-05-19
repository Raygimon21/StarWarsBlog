import React from "react";
import { Link } from "react-router-dom";
import  Favorites  from "./favorites";

export const Navbar = () => {
	return (
		<nav className="navbar bg-light d-flex">
			<div className="container">
				<a className="navbar-brand" href="#">
					<img className="logoImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Star_wars2.svg/800px-Star_wars2.svg.png" alt="Bootstrap" width="30" height="24"/>
				</a>
			</div>
			<div className="btn-group">
				<button type="button" className="btn btn-primary dropdown-toggle m-2" data-bs-toggle="dropdown" aria-expanded="false">
					Favorites ()
				</button>
				<ul className="dropdown-menu">
					<li><Favorites></Favorites></li>
				</ul>
			</div>
		</nav>

	);
};
