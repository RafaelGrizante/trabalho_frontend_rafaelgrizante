import { useEffect, useState, useCallback } from "react";
import { fetchGraphQL } from "../services/graphql";

export function useGraphQL(query) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelado = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const resultado = await fetchGraphQL(query);
        if (!cancelado) setData(resultado);
      } catch (err) {
        if (!cancelado) setError(err.message || "Erro desconhecido.");
      } finally {
        if (!cancelado) setLoading(false);
      }
    })();

    return () => {
      cancelado = true;
    };
  }, [query, reloadKey]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  return { data, loading, error, reload };
}