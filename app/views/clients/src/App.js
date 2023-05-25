import React from 'react';
import Navbar from './Components/navbar';
import { Route, Routes } from 'react-router-dom';
import Inicio from './interface/home/home';
function App() {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Inicio />}>
					<Route path='Carrito' element={""} />
				</Route>
			</Routes>
		</div>


	);
}

export default App;