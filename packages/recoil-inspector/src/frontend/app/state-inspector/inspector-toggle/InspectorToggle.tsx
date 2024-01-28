export function InspectorToggle({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="inspector-toggle-button">
      ⚛️🔍
    </button>
  );
}
