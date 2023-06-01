import React from "react";
import Navbar from "../../Components/navbar";
import Componentes from "../../Components/slider";
import Producto from "../../Components/producto";
import Carpro from "../../Components/carpro";
import Footer from "../../Components/footer";

const Inicio = () => {

	return (
		<div>
			<div>
				<Componentes/>
			</div>
			<Carpro/>
			<Footer />
		</div>


	);
};

export default Inicio;