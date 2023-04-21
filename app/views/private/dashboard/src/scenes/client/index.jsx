import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../themes";
import { mockDataClients } from "../../data/mockData";
import Header from "../../components/header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ModalData from "../../modals/client";
import Modal from "@mui/material/Modal";

const Clients = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "user_email",
      headerName: "User email",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "password",
      headerName: "Password",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "dui",
      headerName: "DUI",
      type: "number",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "birthdate",
      headerName: "BirthDate",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "client_status",
      headerName: "Client status",
      flex: 1,
      headerAlign: "center",
      align: "center",
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
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="CLIENTS" subtitle="Managing clients here!!" />
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
          Add client
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
              width: "60vw",
              height: "70vh",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "rgba(255, 255, 255, 0) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0) 0px 20px 40px -30px",
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
              <h1>Register a client</h1>
            </div>
            <ModalData />
            {/* We charge the inputs we are gonna use to insert data */}
          </Box>
        </Modal>

        <DataGrid
          checkboxSelection
          rows={mockDataClients}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Clients;
