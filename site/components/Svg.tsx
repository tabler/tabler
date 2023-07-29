export default function Svg({ width = 20, height = 20, className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      stroke="#b8cef1"
    >
      <rect x=".5" y=".5" width={width - 1} height={height - 1} fill="#fff" rx="2" />
      <line x1="1" y1="1" x2={width - 1} y2={height - 1} />
      <line x1="1" y1={height - 1} x2={width - 1} y2="1" />
    </svg>
  );
}
