export function Field({ label, children, hint }) {
  return (
    <div className="field">
      <div className="label">{label}</div>
      {children}
      {hint ? <div className="small">{hint}</div> : null}
    </div>
  );
}
