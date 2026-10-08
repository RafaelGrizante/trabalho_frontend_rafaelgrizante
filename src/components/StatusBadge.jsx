export default function StatusBadge({ texto, tipo = "" }) {
    return (
      <div className={`status ${tipo}`}>
        <span className="dot"></span>
        <span className="status-text">{texto}</span>
      </div>
    );
  }