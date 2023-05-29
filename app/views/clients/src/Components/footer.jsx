import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <Box className=''>
      <Box className="">
        <Box className="flex flex-col items-center justify-center max-w-screen m-auto">
          <Box>
            <img src="logo" alt="logo-mardehilos" />
          </Box>
          <nav>
            <ul className="m-0 p-0 flex justify-center list-none">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>
        </Box>
        <Box>
          <p>&copy; 2023 Mar de hilos. All rights reserved.</p>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
