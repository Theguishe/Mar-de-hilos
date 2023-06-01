import Box from "@mui/material/Box";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const Footer = () => {
  return (
    <Box>
      <footer className="bg-gray-100 text-black py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-around">
            <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Mar de hilos
              </h2>
              <ul className="text-center">
                <li className="mb-2">
                  <a href="/">Home</a>
                </li>
                <li className="mb-2">
                  <a href="/">About Us</a>
                </li>
                <li className="mb-2">
                  <a href="/">Careers</a>
                </li>
                <li className="mb-2">
                  <a href="/">Contact Us</a>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
              <h2 className="text-2xl font-bold mb-4 text-center">Products</h2>
              <ul className="text-center">
                <li className="mb-2">
                  <a href="/">Recomendados</a>
                </li>
                <li className="mb-2">
                  <a href="/">Carrito</a>
                </li>
                <li className="mb-2">
                  <a href="/">Favoritos</a>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/4">
              <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
              <ul className="flex">
                <li className="mr-4">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon />
                  </a>
                </li>
                <li className="mr-4">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />
                  </a>
                </li>
                <li className="mr-4">
                  <a href="/" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>
              &copy; {new Date().getFullYear()} Mar de Hilos. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </Box>
  );
};

export default Footer;
