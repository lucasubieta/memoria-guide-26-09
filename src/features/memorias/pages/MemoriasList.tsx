import { useMemorias } from "../hooks/useMemorias";
import { MemoriasTable } from "../components";
export default function MemoriasList() {
  const {
    memorias,
    isLoading
  } = useMemorias();
  return <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Titulaciones</h1>
        <h3 className="text-lg text-muted-foreground mt-2">Seleccione la titulación a la que pertenece su guía de aprendizaje.</h3>
      </div>

      {/* Memorias Table */}
      <MemoriasTable memorias={memorias} isLoading={isLoading} title="Titulaciones" emptyMessage="No se encontraron titulaciones" />
    </div>;
}