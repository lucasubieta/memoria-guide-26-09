import { useMemorias } from "../hooks/useMemorias";
import { MemoriasTable } from "../components";
export default function MemoriasList() {
  const {
    memorias,
    isLoading
  } = useMemorias();
  return <div className="space-y-6">
      {/* Memorias Table */}
      <MemoriasTable memorias={memorias} isLoading={isLoading} title="Titulaciones" emptyMessage="No se encontraron titulaciones" />
    </div>;
}