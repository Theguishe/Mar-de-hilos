import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Inicio from './interface/home/home';
import Carrito from './interface/carrito/carrito';
import Navbar from './Components/navbar';
import Favorito from './interface/favoritos';
import ProductPage from './interface/product';

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route path='/' element={<ProductPage />} />
					<Route path='/Favoritos' element={<Favorito/>} />
				</Route>
			</Routes>
		</div>


	);
}

export default App;