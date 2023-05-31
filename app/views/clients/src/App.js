import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Inicio from './interface/home/home';
import Carrito from './interface/carrito/carrito';
import Navbar from './Components/navbar';
import Favorito from './interface/favoritos';
import ProductPage from './interface/product';
import CarlItem from './Components/carItem';

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route path='/' element={<CarlItem/>} />
					<Route path='/Favoritos' element={<Favorito/>} />
				</Route>
			</Routes>
		</div>


	);
}

export default App;