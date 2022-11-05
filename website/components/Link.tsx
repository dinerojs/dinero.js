import Link from 'next/link';
import React from 'react';

export function ExternalLink(props: React.ComponentProps<'a'>) {
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

export function InternalLink(props: Parameters<typeof Link>[0]) {
  return <Link {...props} />;
}
