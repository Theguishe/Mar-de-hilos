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
import { Pie, Bar, Doughnut, Bubble, Radar } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [countClients, setCountClients] = useState(0);
  const [countUsers, setCountUsers] = useState(0);
  const [countOrders, setCountOrders] = useState(0);
  const [countCart, setCountCart] = useState(0);
  const [countTotal, setCountTotal] = useState(0);

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

  const [productos2, setProductos2] = useState([]);
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

        setProductos2(formattedData);
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

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Total vendido y cantidad de pedidos por mes
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                <span>$</span> {countTotal}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="225px" m="-20px 0 0 0" margin="3px" width="100%">
            <Bar
              data={{
                labels: productos2.map((item) => getMonthName(item.mes)),
                datasets: [
                  {
                    label: "Cantidad de Pedidos",
                    data: productos2.map((item) => item.cantidad_pedidos),
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
              width={chartWidth}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Distribucion de usuarios por nivel
            </Typography>
          </Box>
          <Radar
            data={{
              labels: productos4.map((item) => item.nivel_usuario),
              datasets: [
                {
                  label: "Distribución de usuarios por Nivel",
                  data: productos4.map((item) => item.cantidad_clientes),
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  pointStyle: "triangle", // Puedes cambiar el estilo de los puntos si lo deseas
                },
              },
            }}
          />
          {/* {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))} */}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600" marginBottom="10px">
            Grafico de productos por categoria
          </Typography>
          <Box sx={{ height: "100%", marginLeft: "20px" }}>
            <Pie
              data={{
                labels: productos.map((item) => item.categoria),
                datasets: [
                  {
                    data: productos.map((item) => item.cantidad_productos),
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
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          width="400px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px", textAlign: "center" }}
          >
            Productos por Tipo
          </Typography>
          <Box
            height="250px"
            width="230px"
            mt="-20px"
            sx={{ marginLeft: "90px", marginTop: "10px" }}
          >
            <Doughnut
              data={{
                labels: productos1.map((item) => item.tipo_producto),
                datasets: [
                  {
                    data: productos1.map((item) => item.cantidad_productos),
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
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Top 10 productos mas vendidos
          </Typography>
          <Box height="200px">
            <Bubble
              data={{
                datasets: [
                  {
                    data: productos3.map((item) => ({
                      x: item.cantidad_vendida,
                      y: item.cantidad_vendida,
                      r: 10, // Ajusta este valor según tus datos
                      nombre: item.nombre,
                      cantidad_vendida: item.cantidad_vendida,
                    })),
                    backgroundColor: "rgba(255, 255, 255, 0.6",
                    label: "Productos mas vendidos",
                  },
                ],
              }}
              options={{
                scales: {
                  y: { beginAtZero: true },
                  x: { beginAtZero: true },
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const data = context.raw;
                        return `${data.nombre}: ${data.cantidad_vendida} veces vendido`;
                      },
                    },
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
