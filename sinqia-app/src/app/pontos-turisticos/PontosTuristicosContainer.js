import React, { useEffect, useState } from "react";
import FiltrosPontosTuristicos from "./components/FiltrosPontosTuristicos";
import TabelaPontosTuristicos from "./components/TabelaPontosTuristicos";
import ModalPontoTuristico from "./components/ModalPontoTuristico";
import ModalConfirmarExclusao from "./components/ModalConfirmarExclusao";
import {
  listarPontosTuristicos,
  removerPontoTuristico,
} from "@/services/pontosTuristicosService";

export default function PontosTuristicosContainer() {
  const [filtros, setFiltros] = useState({
    regiaoId: "",
    estadoId: "",
    cidadeId: "",
    search: "",
    page: 1,
    limit: 10,
  });
  const [dados, setDados] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [pontoSelecionado, setPontoSelecionado] = useState(null);

  const [modalExcluirOpen, setModalExcluirOpen] = useState(false);
  const [idExcluir, setIdExcluir] = useState(null);

  useEffect(() => {
    setLoading(true);
    listarPontosTuristicos(filtros)
      .then((res) => {
        setDados(res.data.data);
        setTotal(res.data.total);
      })
      .catch(() => {
        setDados([]);
        setTotal(0);
      })
      .finally(() => setLoading(false));
  }, [filtros]);

  const abrirModal = () => {
    setPontoSelecionado(null);
    setModalOpen(true);
  };

  const abrirModalEditar = (ponto) => {
    setPontoSelecionado(ponto);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setModalOpen(false);
    setPontoSelecionado(null);
  };

  const handleSuccess = () => {
    setFiltros((f) => ({ ...f }));
  };

  const abrirModalExcluir = (id) => {
    setIdExcluir(id);
    setModalExcluirOpen(true);
  };

  const handleConfirmarExcluir = async () => {
    await removerPontoTuristico(idExcluir);
    setModalExcluirOpen(false);
    setIdExcluir(null);
    setFiltros((f) => ({ ...f }));
  };

  return (
    <>
      <FiltrosPontosTuristicos
        filtros={filtros}
        setFiltros={setFiltros}
        onAbrirModal={abrirModal}
      />
      <TabelaPontosTuristicos
        rows={dados}
        rowCount={total}
        loading={loading}
        page={filtros.page}
        pageSize={filtros.limit}
        onPageChange={(page) => setFiltros((f) => ({ ...f, page }))}
        onPageSizeChange={(limit) => setFiltros((f) => ({ ...f, limit }))}
        onEdit={abrirModalEditar}
        onDelete={abrirModalExcluir}
      />
      <ModalPontoTuristico
        open={modalOpen}
        onClose={fecharModal}
        onSuccess={handleSuccess}
        ponto={pontoSelecionado}
      />
      <ModalConfirmarExclusao
        open={modalExcluirOpen}
        onClose={() => setModalExcluirOpen(false)}
        onConfirm={handleConfirmarExcluir}
      />
    </>
  );
}
