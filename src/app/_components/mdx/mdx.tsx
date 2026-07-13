import { Pre } from "./pre";

function Lead({ id, children }: { id?: string; children: React.ReactNode }) {
  // A <div>, not <p>: MDX already wraps this block's text content in its own
  // <p> before passing it as children, so a <p> wrapper here would nest
  // <p> inside <p> — invalid HTML that React warns about at hydration.
  // .lead is styled by class, not tag, so this is a no-op visually.
  return (
    <div className="lead" id={id}>
      {children}
    </div>
  );
}

function H2({ id, children }: { id?: string; children: React.ReactNode }) {
  if (children === "Conclusion") {
    return (
      <h2 className="plain" id={id}>
        {children}
      </h2>
    );
  }
  return (
    <div className="sec-h" id={id}>
      <span className="num" />
      <h2>{children}</h2>
    </div>
  );
}

function Compare({ less, more }: { less: string; more: string }) {
  return (
    <div className="cmp">
      <div className="card less">
        <div className="tag">✗ less effective</div>
        <div className="ex">{less}</div>
      </div>
      <div className="card more">
        <div className="tag">✓ more effective</div>
        <div className="ex">{more}</div>
      </div>
    </div>
  );
}

function Prompt({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="prompt">
      {label && <span className="tag">{label}</span>}
      {children}
    </div>
  );
}

export const mdxComponents = {
  pre: Pre,
  h2: H2,
  Lead,
  Compare,
  Prompt,
};
