import { QUERY_ALUNOS } from "../services/graphql";
import { useGraphQL } from "../hooks/useGraphQL";
import Card, { ItemCard } from "./Card";

export default function Alunos({ termoBusca }) {
  const { data, loading, error } = useGraphQL(QUERY_ALUNOS);
  const alunos = data?.students ?? [];

  const filtrados = termoBusca
    ? alunos.filter((a) =>
        `${a.name} ${a.email} ${a.course?.name ?? ""}`
          .toLowerCase()
          .includes(termoBusca.toLowerCase())
      )
    : alunos;

  return (
    <Card
      titulo="Alunos"
      count={alunos.length}
      loading={loading}
      error={error}
      tipo="aluno"
    >
      {filtrados.map((aluno, i) => (
        <ItemCard key={aluno.id} tipo="aluno" index={i}>
          <strong>{aluno.name}</strong>
          <br />
          <span className="linha-secundaria">{aluno.email}</span>
          <br />
          <span className="linha-secundaria">
            Curso: {aluno.course?.name ?? "Não informado"}
          </span>
        </ItemCard>
      ))}
    </Card>
  );
}