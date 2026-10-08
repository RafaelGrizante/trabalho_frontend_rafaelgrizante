import { useEffect, useState } from "react";

export function useTheme() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("tema") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("tema", dark ? "dark" : "light");
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}