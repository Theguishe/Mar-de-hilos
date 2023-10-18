import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../themes";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Header from "../../components/header";
import LineChart from "../../components/lineChart";
import GeographyChart from "../../components/geography";
import BarChart from "../../components/barChart";
import StatBox from "../../components/statBox";
import { useEffect, useState } from "react";
import {
  Pie,
  Bar,
  Doughnut,
  Bubble,
  Radar,
  PolarArea,
  Line,
} from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [countClients, setCountClients] = useState(0);
  const [countUsers, setCountUsers] = useState(0);
  const [countOrders, setCountOrders] = useState(0);
  const [countCart, setCountCart] = useState(0);
  const [countTotal, setCountTotal] = useState(0);

  // gráficos de david 😁
  const [david, setDavid] = useState([]);
  const [david2, setDavid2] = useState([]);

  // graficos de barasex 🙃
  const [bara, setBara] = useState([]);
  const [bara2, setBara2] = useState([]);
  const [bara3, setBara3] = useState([]);

  // Productos Favoritos 🛒
  useEffect(() => {
    fetch("http://localhost:5000/productos/fav")
      .then((response) => response.json())
      .then((data) => {
        // Bara 1
        setBara(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Cantidad de productos por cliente 🧾
  useEffect(() => {
    fetch("http://localhost:5000/productos/cliente")
      .then((response) => response.json())
      .then((data) => {
        // Bara 2
        setBara2(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Cantidad de productos por categoria ✂️
  useEffect(() => {
    fetch("http://localhost:5000/productos/categoria")
      .then((response) => response.json())
      .then((data) => {
        // Bara 3
        setBara3(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Cantidad de reseñas por producto  😇
  useEffect(() => {
    fetch("http://localhost:5000/productos/resenas")
      .then((response) => response.json())
      .then((data) => {
        setDavid(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const months = Array.from({ length: 12 }, (_, i) => i + 1); // Array de números de mes del 1 al 12

  useEffect(() => {
    fetch("http://localhost:5000/productoPorMes")
      .then((response) => response.json())
      .then((result) => {
        // Organiza los datos en un objeto para facilitar la manipulación
        const dataObject = {};
        result.forEach((item) => {
          dataObject[item.mes] = item.cantidad_pedidos;
        });

        // Llena los datos para cada mes (asegurando que todos los meses estén presentes)
        const formattedData = months.map((month) => ({
          mes: month,
          cantidad_pedidos: dataObject[month] || 0,
        }));

        setDavid2(formattedData);
      })
      .catch((error) => console.error(error));
  }, []);

  // Función para obtener el nombre del mes a partir de su numero
  const getMonthName = (monthNumber) => {
    const monthNames = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return monthNames[monthNumber - 1]; // Restamos 1 porque los índices comienzan desde 0
  };

  const chartWidth = 40 * months.length;

  useEffect(() => {
    fetch("http://localhost:5000/countClient")
      .then((response) => response.json())
      .then((data) => {
        setCountClients(data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/countUser")
      .then((response) => response.json())
      .then((data) => {
        setCountUsers(data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/countOrder")
      .then((response) => response.json())
      .then((data) => {
        setCountOrders(data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/countCart")
      .then((response) => response.json())
      .then((data) => {
        setCountCart(data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/countTotal")
      .then((response) => response.json())
      .then((data) => {
        setCountTotal(data.total_productos_vendidos);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/productoCategoria")
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const [productos1, setProductos1] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/productoTipo")
      .then((response) => response.json())
      .then((data) => {
        setProductos1(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/productoTipo")
      .then((response) => response.json())
      .then((data) => {
        setProductos1(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const [productos3, setProductos3] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/topTenProductos")
      .then((response) => response.json())
      .then((data) => {
        setProductos3(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const [productos4, setProductos4] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/usuariosPorNivel")
      .then((response) => response.json())
      .then((data) => {
        setProductos4(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={countUsers}
            subtitle="Users in total"
            progress="0.25"
            increase="+14%"
            icon={
              <AdminPanelSettingsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={countOrders}
            subtitle="Orders Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={countClients}
            subtitle="Clients in total"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={countCart}
            subtitle="New cart registers"
            progress="0.80"
            increase="+43%"
            icon={
              <ShoppingCartIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW 4 */}
        {/* Bara 1 */}
        <Box
          gridColumn="span 6"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px", textAlign: "center" }}
          >
            PRODUCTOS FAVORITOS
          </Typography>
          <Doughnut
            data={{
              labels: bara.map((item) => item.nombre_producto),
              datasets: [
                {
                  data: bara.map((item) => item.sum),
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.7)",
                    "rgba(75, 192, 192, 0.7)",
                    "rgba(255, 205, 86, 0.7)",
                    "rgba(54, 162, 235, 0.7)",
                    // Agrega más colores según sea necesario
                  ],
                  hoverOffset: 4, // Espaciado al hacer hover
                },
              ],
            }}
          />
        </Box>
        {/* Bara 2 */}
        <Box
          gridColumn="span 6"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px", textAlign: "center" }}
          >
            PRODUCTOS POR CLIENTE
          </Typography>
          <PolarArea
            data={{
              labels: bara2.map((item) => item.apellido_cliente),
              datasets: [
                {
                  data: bara2.map((item) => item.sum),
                  backgroundColor: [
                    "rgba(255, 99, 132)",
                    "rgba(54, 162, 235)",
                    "rgba(255, 206, 86)",
                    "rgba(75, 192, 192)",
                    "rgba(153, 102, 255)",
                  ],
                },
              ],
            }}
          />
        </Box>
        {/* Bara 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px", textAlign: "center" }}
          >
            PRODUCTOS POR CATEGORIA
          </Typography>
          <Bar
            data={{
              labels: bara3.map((item) => item.nombre_categoria),
              datasets: [
                {
                  label: "Cantidad",
                  data: bara3.map((item) => item.count),
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  borderColor: "rgba(75, 192, 192, 1)",
                  borderWidth: 1,
                },
              ],
            }}
          />
        </Box>
        {/* David 4 */}
        <Box
          gridColumn="span 6"
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px", textAlign: "center" }}
          >
            PRODUCTOS CON MÁS RESEÑAS
          </Typography>
          <Pie
            data={{
              labels: david.map((item) => item.nombre_producto),
              datasets: [
                {
                  data: david.map((item) => item.count),
                  backgroundColor: [
                    "rgba(255, 99, 132)",
                    "rgba(54, 162, 235)",
                    "rgba(255, 206, 86)",
                    "rgba(75, 192, 192)",
                    "rgba(153, 102, 255)",
                  ],
                  hoverOffset: 4, // Espaciado al hacer hover
                },
              ],
            }}
          />
        </Box>

        <Box
          gridColumn="span 12"
          gridRow="span 8"
          backgroundColor={colors.primary[400]}
          p="30px"
          m="10px"
          bottom="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px", textAlign: "center" }}
          >
            PEDIDOS POR MES
            <Line
              data={{
                labels: david2.map((item) => getMonthName(item.mes)),
                datasets: [
                  {
                    label: "Cantidad de Pedidos",
                    data: david2.map((item) => item.cantidad_pedidos),
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                scales: {
                  x: {
                    min: 0,
                    max: chartWidth, // Ancho del gráfico
                  },
                },
              }}
            />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
