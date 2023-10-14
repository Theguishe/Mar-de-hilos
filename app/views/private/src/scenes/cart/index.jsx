import React, { useEffect, useState } from "react";
import { Box, Tooltip, useTheme, Button, Modal } from "@mui/material";
import Header from "../../components/header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SummarizeIcon from "@mui/icons-material/Summarize";

import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Cart = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const generatePDF = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart");
      const data = await response.json();

      //Crear un nuevo doc PDF
      const doc = new jsPDF();
      doc.text("Reporte de carrito - mardehilos", 15, 10);

      const logo = require("../../assets/imgs/logo_ejemplo.png");
      doc.addImage(logo, "PNG", 175, 10, 20, 20);

      const mainHeader = (data) => {
        doc.setFontSize(8);
        doc.setTextColor(170, 170, 170);
        doc.text(new Date().toLocaleDateString(), 20, 20);

        const currentTime = new Date().toLocaleTimeString();
        doc.setTextColor("#444");
        doc.setFontSize(8);
        doc.text("Hora: " + currentTime, 20, 25);

        // Footer
        const pageNumber = data.pageNumber;
        doc.setFontSize(12);
        doc.setTextColor("#444");
        doc.text("Página " + pageNumber, 100, 280);
      };

      //Definimos la posicion inicial de la tabla
      let y = 40;

      // Headers de la tabla
      const headers = ["ID", "Cantidad", "Review", "Product desc"];

      const tableHeight = function (data) {
        return 100; // Ajusta la altura de la tabla según tus necesidades
      };

      // Crear la tabla con jsPDF-AutoTable
      doc.autoTable({
        head: [headers],
        body: data.map((row) => Object.values(row)),
        startY: y,
        didDrawPage: mainHeader,
        tableHeight: tableHeight(120),
        headStyles: {
          textColor: [255, 255, 255],
          fontSize: 12,
          fontStyle: "bold",
          textAlign: "center",
        },
        styles: { fontSize: 10 },
      });

      // Guardamos el pdf y lo mostramos en una pestaña nueva
      doc.save("carrito_reporte.pdf");
    } catch (error) {
      console.log("Error al generar el PDF", error);
    }
  };

  const columns = [
    { field: "ID", headerName: "ID" },
    {
      field: "Cantidad",
      headerName: "Cantidad",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Review",
      headerName: "Resenia",
      flex: 1,
    },
    {
      field: "Product",
      headerName: "Producto",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      renderCell: (row) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="space-around"
          >
            <Tooltip title="Edit this client">
              <IconButton>
                <SummarizeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Edit this client">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove this client">
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="SHOPPING CART" subtitle="Shopping cart list per client" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer": {
            float: "right",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1em",
          }}
        >
          <Button
            onClick={handleOpen}
            sx={{
              background: `${colors.blueAccent[700]}`,
              color: "#fff",
              fontSize: "16px",
              padding: "5px 30px 5px 30px",
              textTransform: "capitalize",
              "&:hover": {
                background: `${colors.blueAccent[800]}`, // Here continues
              },
            }}
          >
            Add Shopping cart
          </Button>
          <Button
            onClick={generatePDF}
            sx={{
              background: `${colors.blueAccent[700]}`,
              color: "#fff",
              fontSize: "16px",
              padding: "5px 30px 5px 30px",
              textTransform: "capitalize",
              "&:hover": {
                background: `${colors.blueAccent[800]}`, // Here continues
              },
            }}
          >
            Generate Report
          </Button>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.ID}
        />
      </Box>
    </Box>
  );
};

export default Cart;
