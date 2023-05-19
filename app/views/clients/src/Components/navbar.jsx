import { useRef } from "react";
//import { FaBars, FaShopify, FaTimes } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser, faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import "../index.css";
import React, { useState } from 'react';


function BarraDeBusqueda() {
	const [Buscar, setBuscar] = useState('');

	const handleBuscarChange = (event) => {
		event.preventDefault();
		console.log(Buscar);
		/*function BarraDeBusqueda() {
	const [Buscar, setBuscar] = useState('');

	const handleBuscarChange = (event) => {
	}; 
*/
	};

	return (
		/*
		<input
			type="text"
			placeholder="Search"
			value={Buscar}
			onChange={handleBuscarChange}
		/>
}
*/
		<form className="flex" onSubmit={handleBuscarChange}>
			<input
				className="border rounded-l px-2 py-1"
				type="text"
				placeholder="Buscar..."
				value={Buscar}
				onChange={(event) => setBuscar(event.target.value)}
			/>
			<button className="border rounded-r px-2 py-1 bg-blue-500 text-white" type="submit">
				<FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
			</button>
		</form>
	);
};

const Navbar = () => {
	return (
		<nav className="flex justify-between items-center p-4">

			<BarraDeBusqueda />
			<ul className="flex">
				<li ><a className="mr-5" href="/Usuario"><FontAwesomeIcon icon={faUser} size="xl" /></a></li>
				<li ><a className="mr-5" href="/Carrito" ><FontAwesomeIcon icon={faCartShopping} size="xl" /></a></li>
				<li><a className="mr-8" href="/Favoritos"><FontAwesomeIcon icon={faHeart} size="xl"  /></a></li>
			</ul>

		</nav>
	);
};


/*
function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			<h3>LOGO</h3>
			<nav className="flex justify-between items-center p-4">
				<button>
				<BarraDeBusqueda />
				</button>
				<a className="mr-4" href="/#"><FontAwesomeIcon icon={faHeart} size="xl" style={{ color: "#ffffff", }} /></a>
				<a className="mr-4" href="/#">About me</a>
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
*/

export default Navbar;