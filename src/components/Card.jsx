import Skeleton from "./Skeleton";

export default function Card({
  titulo,
  count,
  loading,
  error,
  children,
  tipo = "aluno",
}) {
  return (
    <section className="card">
      <div className="card-head">
        <h2>{titulo}</h2>
        <span className="badge">{loading ? "…" : count ?? 0}</span>
      </div>

      <div className="lista">
        {loading && <Skeleton qtd={3} />}
        {!loading && error && (
          <p className="erro">Erro ao carregar: {error}</p>
        )}
        {!loading && !error && children}
      </div>
    </section>
  );
}

export function ItemCard({ tipo, index, children }) {
  return (
    <div className={tipo} style={{ animationDelay: `${index * 40}ms` }}>
      {children}
    </div>
  );
}