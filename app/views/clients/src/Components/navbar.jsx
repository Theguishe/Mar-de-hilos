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
				type="text"
				placeholder="Busca un articulo de tu interes"
				value={Buscar}
				onChange={(event) => setBuscar(event.target.value)}
				className="w-80 py-2 px-3 rounded-l-lg"
				/>	
			<button className="border rounded-r-lg px-1 py-1 bg-white" type="submit">
				<FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{ color: "#000000", }} />			</button>
		</form>
	);
};

const Navbar = () => {
	return (
		<nav className="flex justify-around items-center p-4 bg-blue-1000 my-2">
			<a className="mr-5" href="/Home"><FontAwesomeIcon icon={faUser} size="xl" /></a>
			<BarraDeBusqueda />
			<ul className="flex">
				<li ><a className="mx-8"  href="/Usuario"><FontAwesomeIcon icon={faUser} size="2xl" /></a></li>
				<li ><a className="mx-8" href="/Carrito" ><FontAwesomeIcon icon={faCartShopping} size="2xl" /></a></li>
				<li><a className="mx-8" href="/Favoritos"><FontAwesomeIcon icon={faHeart} size="2xl" /></a></li>
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