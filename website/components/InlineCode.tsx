import { MDXComponentProps } from './MDXComponents';

export function InlineCode(
  props: MDXComponentProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return <code data-content="`" className="text-sm text-red-600 before:content after:content" {...props} />;
}
