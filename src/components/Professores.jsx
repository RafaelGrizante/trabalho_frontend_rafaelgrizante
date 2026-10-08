import { QUERY_PROFESSORES } from "../services/graphql";
import { useGraphQL } from "../hooks/useGraphQL";
import Card, { ItemCard } from "./Card";

export default function Professores({ termoBusca }) {
  const { data, loading, error } = useGraphQL(QUERY_PROFESSORES);
  const professores = data?.teachers ?? [];

  const filtrados = termoBusca
    ? professores.filter((p) =>
        `${p.name} ${p.courses.map((c) => c.name).join(" ")}`
          .toLowerCase()
          .includes(termoBusca.toLowerCase())
      )
    : professores;

  return (
    <Card
      titulo="Professores"
      count={professores.length}
      loading={loading}
      error={error}
      tipo="professor"
    >
      {filtrados.map((professor, i) => {
        const nomesCursos =
          professor.courses.length > 0
            ? professor.courses.map((c) => c.name).join(", ")
            : "Nenhum curso";

        return (
          <ItemCard key={professor.id} tipo="professor" index={i}>
            <strong>{professor.name}</strong>
            <br />
            <span className="linha-secundaria">Cursos: {nomesCursos}</span>
          </ItemCard>
        );
      })}
    </Card>
  );
}