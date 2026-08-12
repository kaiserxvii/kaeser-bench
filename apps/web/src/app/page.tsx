const generationStages = [
  { label: "Task", value: "typography-editorial-card@1" },
  { label: "Context", value: "full-documentation@1" },
  { label: "Model", value: "OpenAI adapter" },
] as const;

export default function Page() {
  return (
    <main className="shell">
      <header className="nav">
        <a className="wordmark" href="/" aria-label="Kaeser Bench home">
          <span aria-hidden="true">K</span>
          Kaeser Bench
        </a>
        <span className="status">
          <span className="statusDot" aria-hidden="true" />
          Research preview
        </span>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="heroCopy">
          <p className="eyebrow">Design-system reasoning</p>
          <h1 id="page-title">Kaeser Bench</h1>
          <p className="lede">Generation results, with the evidence attached.</p>
          <p className="summary">
            A benchmark for understanding how coding agents interpret unfamiliar systems, make
            interface decisions, and explain what broke.
          </p>
        </div>

        <aside className="runCard" aria-labelledby="run-card-title">
          <div className="runCardHeader">
            <div>
              <p className="cardLabel">Current capability</p>
              <h2 id="run-card-title">Generation</h2>
            </div>
            <span className="scope">generation-only</span>
          </div>

          <dl className="stageList">
            {generationStages.map((stage, index) => (
              <div className="stage" key={stage.label}>
                <dt>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {stage.label}
                </dt>
                <dd>{stage.value}</dd>
              </div>
            ))}
          </dl>

          <div className="boundary">
            <span>Captured</span>
            <strong>Task · context · response · source</strong>
          </div>
        </aside>
      </section>

      <footer className="footer">
        <p>Pretty is easy. Belonging is harder.</p>
        <p>Sandbox and evaluation are the next stages.</p>
      </footer>
    </main>
  );
}
