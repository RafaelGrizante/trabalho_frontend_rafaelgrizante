export const GRAPHQL_ENDPOINT =
  "https://testing-graphql.onrender.com/graphql";

export async function fetchGraphQL(query) {
  const resposta = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!resposta.ok) {
    throw new Error(`Erro HTTP: ${resposta.status} ${resposta.statusText}`);
  }

  const resultado = await resposta.json();
  if (resultado.errors) throw new Error(resultado.errors[0].message);
  if (!resultado.data) throw new Error("Resposta inválida.");
  return resultado.data;
}

export const QUERY_ALUNOS = `
  query {
    students {
      id
      name
      email
      course { id name credits }
    }
  }
`;

export const QUERY_CURSOS = `
  query {
    courses {
      id
      name
      credits
      students { id name }
    }
  }
`;

export const QUERY_PROFESSORES = `
  query {
    teachers {
      id
      name
      courses { id name }
    }
  }
`;