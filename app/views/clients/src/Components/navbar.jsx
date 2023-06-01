import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser, faHeart, faSearch, faFontAwesome } from "@fortawesome/free-solid-svg-icons"
import "../index.css";
import { Outlet, Link } from "react-router-dom";

const Usuario = () => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative">
			<a onClick={() => setOpen(!open)} className="m-8">
				<FontAwesomeIcon icon={faUser} size="xl" />
			</a>
			<div className="bg-slate-50 w-52 absolute -left-12 top-16 z-50" ref={dropdownRef}>
				{open && (
					<div className="">
						<ul>
							<li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100">
								<Link to="/Login">Iniciar sesión</Link>
							</li>
							<li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100">
								<Link>Configuración</Link>
							</li>
							<li className="p-2 text-lg cursor-pointer rounded hover:bg-blue-100">
								<Link to="/Personalizados">Pedido Personalizado</Link>
							</li>
						</ul>
						<hr />
					</div>
				)}
			</div>
		</div>
	);
};

function BarraDeBusqueda() {
	const [Buscar, setBuscar] = useState('');

	const handleBuscarChange = (event) => {
		event.preventDefault();
	};

	return (
		<form className="flex" onSubmit={handleBuscarChange}>
			<input
				type="text"
				placeholder="Busca un artículo de tu interés"
				value={Buscar}
				onChange={(event) => setBuscar(event.target.value)}
				className="max-w-screen-xl w-96 flex px-3 rounded-l-lg border bg-white"
			/>
			<button className="border rounded-r-lg px-1 py-1 bg-white" type="submit">
				<FontAwesomeIcon icon={faSearch} size="xl" style={{ color: "#000000", }} />
			</button>
		</form>
	);
};

const Navbar = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 780);
		};

		handleResize(); // Ejecutar una vez al inicio
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div>
			<nav className="flex justify-around items-center p-5 bg-gray-100 mb-2">
				<Link to="/"><FontAwesomeIcon icon={faFontAwesome} size="xl" /></Link>
				{!isMobile && <BarraDeBusqueda />}
				<ul className="flex">
					{!isMobile && (
						<>
							<li className="hidden md:block">
								<Usuario />
							</li>
							<li className="hidden md:block ">
								<Link className="m-8" to="/Carrito"><FontAwesomeIcon icon={faCartShopping} size="xl" /></Link>
							</li>
							<li className="hidden md:block ">
								<Link className="m-8" to="/Favoritos"><FontAwesomeIcon icon={faHeart} size="xl" /></Link>
							</li>
						</>
					)}
				</ul>
			</nav>
			<Outlet />
			<hr />
		</div>
	);
};

export default Navbar;