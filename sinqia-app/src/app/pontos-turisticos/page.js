"use client";

import { useState } from "react";
import Header from "../../components/base/Header";
import Footer from "../../components/base/Footer";
import Sidebar from "../../components/base/Sidebar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

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
        <div className="flex-1 p-8">teste</div>
      </div>
      <Footer />
    </div>
  );
}