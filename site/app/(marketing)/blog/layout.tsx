
export default function CoreLayout({
  children
}: {
  children: React.ReactNode,
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col">
            <main className="main">{children}</main>
          </div>
          <div className="col-3">
            <h1 className="section-title section-title-lg">Tabler Blog</h1>
            <p className="section-description">
              Stay in the loop with all things Tabler. We provide regular
              updates on new features, changelogs, and news, ensuring you never
              miss any of our software developments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
