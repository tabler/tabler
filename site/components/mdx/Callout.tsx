export default function Callout({ children, title = 'Important' }) {
  return (
    <div className="callout">
      <div className="callout-title">{title}</div>
      {children}
    </div>
  );
}
