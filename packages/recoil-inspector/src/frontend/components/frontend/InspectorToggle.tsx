import './styles/inspector-toggle.css';

export function InspectorToggle({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="button">
      ⚛️🔍
    </button>
  );
}
