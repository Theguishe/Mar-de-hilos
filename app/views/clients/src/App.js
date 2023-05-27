import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Inicio from './interface/home/home';
import Carrito from './interface/carrito/carrito';
import Navbar from './Components/navbar';
function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route path='/' element={<Inicio />} />
					<Route path='/Carrito' element={<Carrito />} />
				</Route>
			</Routes>
		</div>


	);
}

export default App;