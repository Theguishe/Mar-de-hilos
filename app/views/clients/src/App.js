import React from 'react';
import Navbar from './Components/navbar';
import Carrusel from './Components/carrusel';
import Inicio from './interface/home';


function App() {
	return (
		<React.Fragment>
			<Navbar/>
			<Inicio />
		</React.Fragment>
	);
}

export default App;