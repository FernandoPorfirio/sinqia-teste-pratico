"use client";

import Header from "../../components/base/Header";
import Footer from "../../components/base/Footer";
import Sidebar from "../../components/base/Sidebar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { useState } from "react";
import PontosTuristicosContainer from "./PontosTuristicosContainer";

export default function PontosTuristicosPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1">
        <div className="p-2">
          <IconButton onClick={() => setSidebarOpen(true)} size="large">
            <MenuIcon />
          </IconButton>
        </div>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <PontosTuristicosContainer />
        </Container>
      </div>
      <Footer />
    </div>
  );
}