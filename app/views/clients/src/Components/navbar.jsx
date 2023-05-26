import { useRef } from "react";
//import { FaBars, FaShopify, FaTimes } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser, faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import "../index.css";
import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";


function Usuario() {
	
	const [open, setOpen] = useState(false)
	return (
		<div className="relative">
			<a onClick={() => setOpen(!open)} className="m-8"><FontAwesomeIcon icon={faUser} size="xl" /></a>
			<div className=" bg-slate-50 w-52  absolute -left-12 top-16 z-50">
				{open && (
					<div className="">
						<ul>
							<li className=" p-2 text-lg cursor-pointer rounded hover:bg-blue-100" onClick={() => setOpen(false)}><Link to="/Login">Iniciar sesión</Link></li>
							<li className=" p-2 text-lg cursor-pointer rounded hover:bg-blue-100" onClick={() => setOpen(false)}><Link>Configuración</Link></li>
							<li className=" p-2 text-lg cursor-pointer rounded hover:bg-blue-100" onClick={() => setOpen(false)}><Link to="/Personalizados">Pedido Personalizado</Link></li>
						</ul>
						<hr />
					</div>
				)}
			</div>
		</div>
	)
}

function BarraDeBusqueda() {
	const [Buscar, setBuscar] = useState('');

	const handleBuscarChange = (event) => {
		event.preventDefault();
		console.log(Buscar);
	};

	return (
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
		<div>
			<nav className="flex justify-around items-center p-4 bg-gray-400 mb-2">
				<Link className="" to="/"><FontAwesomeIcon icon={faUser} size="xl" /></Link>
				<BarraDeBusqueda />
				<ul className="flex">
					<li>
						<Usuario /></li>
					<li >
						<Link className="m-8" to="/Carrito"><FontAwesomeIcon icon={faCartShopping} size="xl" /></Link>
					</li>
					<li>
						<Link className="m-8" to="/Favoritos"><FontAwesomeIcon icon={faHeart} size="xl" /></Link>
					</li>
				</ul>
			</nav>
			<Outlet />
		</div>
	);
};

export default Navbar;





