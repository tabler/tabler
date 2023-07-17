
export default function SingleLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <section className="section">
      <div className="container container-narrow">
        {children}
      </div>
    </section>
  );
}
