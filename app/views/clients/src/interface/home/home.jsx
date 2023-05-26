import React from "react";
import Navbar from "../../Components/navbar";
import Example from "../../Components/prueba";
import Componentes from "../../Components/slider";

const Inicio = () => {

	return (
		<div>
			<div>
				<Navbar />
				<Componentes/>
			</div>
			<Example/>
		</div>


	);
};

export default Inicio;