export default function SectionDivider({ wave = false }) {
  if (wave) {
    return (
      <svg className="section-divider section-divider-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 80">
        <path d="M1920,80 L0,80 L0,0 C0,0 387,59 960,59 C1533,59 1920,0 1920,0 L1920,80 Z" />
      </svg>
    );
  }

  return (
    <svg
      className="section-divider"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
    >
      <path className="wave-1" d="M-110 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      <path className="wave-2" d="M-110 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      <path className="wave-3" d="M-110 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
    </svg>
  );
}
