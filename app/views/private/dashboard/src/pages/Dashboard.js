import React, { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../themes";
import { Routes, Route, Navigate } from "react-router-dom";
import Topbar from "../scenes/global/topbar";
import Sidebar from "../scenes/global/sidebar";
import Dashboard from "../scenes/dashboard/";
import Team from "../scenes/team/";
import Invoices from "../scenes/invoices/";
import Clients from "../scenes/client/index";
import Form from "../scenes/form/";
import Line from "../scenes/line/";
import Pie from "../scenes/pie/";
import FAQ from "../scenes/faq/";
import Geography from "../scenes/geography/";
import Calendar from "../scenes/calendar/calendar";

// import Login from "./Login"; For the make the user validations to login and logout

const DashboardPage = () => {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  if (authenticated) { // The same to say if(authentizated === true)
    return <Navigate to="/login" />;
  } else {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="clients" element={<Clients />} />
                <Route path="users" element={<Invoices />} />
                <Route path="products" element={<Form />} />
                <Route path="orders" element={<Team />} />
                <Route path="cart" element={<Team />} />
                <Route path="pie" element={<Pie />} />
                <Route path="line" element={<Line />} />
                <Route path="faq" element={<FAQ />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="geography" element={<Geography />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }
};

export default DashboardPage;
