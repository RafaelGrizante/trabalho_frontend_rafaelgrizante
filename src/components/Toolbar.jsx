import { useState } from "react";
import StatusBadge from "./StatusBadge";

export default function Toolbar({
  status,
  statusTipo,
  onReload,
  dark,
  onToggleTheme,
}) {
  const [spin, setSpin] = useState(false);

  function handleReload() {
    setSpin(true);
    setTimeout(() => setSpin(false), 800);
    onReload();
  }

  return (
    <div className="toolbar">
      <StatusBadge texto={status} tipo={statusTipo} />

      <button className="btn-theme" onClick={onToggleTheme}>
        {dark ? "Claro" : "Escuro"}
      </button>

      <button
        className={`btn-reload ${spin ? "spin" : ""}`}
        onClick={handleReload}
      >
        Atualizar
      </button>
    </div>
  );
}