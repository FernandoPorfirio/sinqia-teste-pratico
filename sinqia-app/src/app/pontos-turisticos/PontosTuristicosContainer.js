import FiltrosPontosTuristicos from "./components/FiltrosPontosTuristicos";
import TabelaPontosTuristicos from "./components/TabelaPontosTuristicos";
import ModalPontoTuristico from "./components/ModalPontoTuristico";
import ModalConfirmarExclusao from "./components/ModalConfirmarExclusao";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function PontosTuristicosContainer() {
  // Aqui você vai colocar os estados e lógica de dados
  const [modalOpen, setModalOpen] = useState(false);
  const [modalExcluirOpen, setModalExcluirOpen] = useState(false);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Pontos Turísticos
      </Typography>
      <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, minHeight: 300 }}>
        <FiltrosPontosTuristicos />
        <TabelaPontosTuristicos 
          onEdit={() => setModalOpen(true)} 
          onDelete={() => setModalExcluirOpen(true)} 
        />
      </Box>
      <ModalPontoTuristico open={modalOpen} onClose={() => setModalOpen(false)} />
      <ModalConfirmarExclusao open={modalExcluirOpen} onClose={() => setModalExcluirOpen(false)} />
    </>
  );
}