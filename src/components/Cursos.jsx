import { QUERY_CURSOS } from "../services/graphql";
import { useGraphQL } from "../hooks/useGraphQL";
import Card, { ItemCard } from "./Card";

export default function Cursos({ termoBusca }) {
  const { data, loading, error } = useGraphQL(QUERY_CURSOS);
  const cursos = data?.courses ?? [];

  const filtrados = termoBusca
    ? cursos.filter((c) =>
        `${c.name} ${c.students.map((a) => a.name).join(" ")}`
          .toLowerCase()
          .includes(termoBusca.toLowerCase())
      )
    : cursos;

  return (
    <Card
      titulo="Cursos"
      count={cursos.length}
      loading={loading}
      error={error}
      tipo="curso"
    >
      {filtrados.map((curso, i) => {
        const nomesAlunos =
          curso.students.length > 0
            ? curso.students.map((a) => a.name).join(", ")
            : "Nenhum aluno";

        return (
          <ItemCard key={curso.id} tipo="curso" index={i}>
            <strong>{curso.name}</strong>
            <br />
            <span className="linha-secundaria">
              Créditos: {curso.credits}
            </span>
            <br />
            <span className="linha-secundaria">Alunos: {nomesAlunos}</span>
          </ItemCard>
        );
      })}
    </Card>
  );
}