import Link from 'next/link';

type LinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export function ExternalLink(props: LinkProps) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

export function InternalLink(props: LinkProps) {
  if (props.href) {
    return (
      <Link href={props.href}>
        <a {...props} />
      </Link>
    );
  }

  return null;
}
