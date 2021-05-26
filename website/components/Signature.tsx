type SignatureProps = {
  children: React.ReactNode;
};

export function Signature({ children }: SignatureProps) {
  return (
    <div>
      <h2 id="function-signature">Function signature</h2>
      {children}
    </div>
  )
}
