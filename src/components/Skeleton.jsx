export default function Skeleton({ qtd = 3 }) {
    return (
      <>
        {Array.from({ length: qtd }).map((_, i) => (
          <div key={i} className="skeleton" />
        ))}
      </>
    );
  }