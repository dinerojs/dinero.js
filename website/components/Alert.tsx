type AlertProps = {
  children: React.ReactNode,
  type: 'info' | 'warning',
};

export function Alert({ children }: AlertProps) {
  return <div role="alert">{children}</div>;
}
