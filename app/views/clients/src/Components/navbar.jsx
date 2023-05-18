import { useRef } from "react";
import { FaBars, FaShopify, FaTimes } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser, faHeart } from "@fortawesome/free-solid-svg-icons"
import "../Styles/main.css";

import React, { useState } from 'react';

function SearchBar() {
	const [Buscar, setBuscar] = useState('');

	const handleSearchChange = (event) => {
		setBuscar(event.target.value);
	};

	return (
		<input
			type="text"
			placeholder="Search"
			value={Buscar}
			onChange={handleSearchChange}
		/>
	);
}
function Navbar() {
	const navRef = useRef();
	const [Buscar, setBuscar] = useState("");

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<h3>LOGO</h3>
			<nav ref={navRef}>
				<button>

				</button>
				<a href="/#"><FontAwesomeIcon icon={faUser} size="xl" style={{ color: "#ffffff", }} /></a>
				<a href="/#"><FontAwesomeIcon icon={faCartShopping} size="xl" style={{ color: "#ffffff", }} /></a>
				<a href="/#"><FontAwesomeIcon icon={faHeart} size="xl" style={{ color: "#ffffff", }} /></a>
				<a href="/#">About me</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
			</button>
		</header>
	);
}

export default Navbar;