import { MDXComponentProps } from './MDXComponents';

export function Scrollable(
  props: MDXComponentProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return <div className="overflow-x-scroll" {...props} />;
}
