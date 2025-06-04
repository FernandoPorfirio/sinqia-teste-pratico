import { useState, useEffect } from "react";
import FiltrosPontosTuristicos from "./components/FiltrosPontosTuristicos";
import TabelaPontosTuristicos from "./components/TabelaPontosTuristicos";
import { listarPontosTuristicos } from "@/services/pontosTuristicosService";

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

  useEffect(() => {
    setLoading(true);
    listarPontosTuristicos(filtros)
      .then((res) => {
        console.log('Dados recebidos:', res.data);
        setDados(res.data.data);
        setTotal(res.data.total);
      })
      .finally(() => setLoading(false));
  }, [filtros]);

  return (
    <>
      <FiltrosPontosTuristicos filtros={filtros} setFiltros={setFiltros} />
      <TabelaPontosTuristicos
        rows={dados}
        rowCount={total}
        loading={loading}
        page={filtros.page}
        pageSize={filtros.limit}
        onPageChange={(page) => setFiltros(f => ({ ...f, page }))}
        onPageSizeChange={(limit) => setFiltros(f => ({ ...f, limit }))}
        // onEdit, onDelete...
      />
    </>
  );
}