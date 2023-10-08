import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import ModalData from "../../modals/orders";

const Orders = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/pedidosC")
      .then((response) => response.json())
      .then((data) => {
        setRows(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    { field: "ID", headerName: "ID" },
    {
      field: "Date",
      headerName: "Order Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Time",
      headerName: "Hour",
      flex: 1,
    },
    {
      field: "Order Status",
      headerName: "Order status",
      flex: 1,
    },
    {
      field: "Product Name",
      headerName: "Product name",
      flex: 1,
    },
    {
      field: "Client",
      headerName: "Client",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="CATALOG ORDERS" subtitle="Here is clients orders !!" />

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
          Add Order
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              background: "#141b2d",
              color: "#fff",
              position: "absolute",
              right: "0",
              left: "0",
              margin: "auto",
              top: "0",
              bottom: "0",
              width: "40vw",
              height: "80vh",
              borderRadius: "12px",
              padding: "25px",
              boxShadow:
                "rgba(255, 255, 255, 0) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0) 0px 20px 40px -30px",
            }}
          >
            <div
              sx={{
                width: "100%",
                color: "#fff",
                fontSize: "16px",
                textAlign: "left",
                marginBottom: "30px",
                backgroundColor: "#000",
              }}
            >
              <h1>Register a catalog order</h1>
            </div>
            <ModalData />
            {/* We charge the inputs we are gonna use to insert data */}
          </Box>
        </Modal>

        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          pageSize={8}
          getRowId={(row) => row.ID}
        />
      </Box>
    </Box>
  );
};

export default Orders;
