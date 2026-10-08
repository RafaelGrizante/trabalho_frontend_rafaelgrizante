import { useMemo, useState } from "react";
import Alunos from "./components/Alunos";
import Cursos from "./components/Cursos";
import Professores from "./components/Professores";
import Toolbar from "./components/Toolbar";
import { useTheme } from "./hooks/useTheme";
import "./App.css";

export default function App() {
  const [termoBusca, setTermoBusca] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const { dark, toggle } = useTheme();

  // Cada clique em "Atualizar" força remontagem dos componentes
  function handleReload() {
    setTermoBusca("");
    setReloadKey((k) => k + 1);
  }

  // Status derivado — como os três componentes são independentes,
  // mostramos algo simples baseado no clique e mudanças de termo
  const status = useMemo(() => {
    return termoBusca
      ? `Filtrando por "${termoBusca}"`
      : "Dados carregados com sucesso";
  }, [termoBusca]);

  return (
    <>
      <div className="bg-orbs">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <header className="hero">
        <h1>
          <span className="gradient-text">Painel Acadêmico</span>
        </h1>
        <p className="subtitle">
          Dados em tempo real via <span className="mono">GraphQL</span>
        </p>

        <Toolbar
          status={status}
          statusTipo={termoBusca ? "" : "ok"}
          onReload={handleReload}
          dark={dark}
          onToggleTheme={toggle}
        />

        <div className="search-wrap">
          <input
            type="text"
            placeholder="Buscar aluno, curso ou professor..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
        </div>
      </header>

      <main className="grid" key={reloadKey}>
        <Alunos termoBusca={termoBusca} />
        <Cursos termoBusca={termoBusca} />
        <Professores termoBusca={termoBusca} />
      </main>

      <footer>Feito com GraphQL</footer>
    </>
  );
}