import Link from 'next/link';

type PanelProps = {
  groups: {
    label: string;
    links: { title: string; url: string }[];
  }[];
};

export function Panel({ groups }: PanelProps) {
  return (
    <div>
      <ul>
        {groups.map(({ label, links }) => (
          <li key={label}>
            <span>{label}</span>
            <ul>
              {links.map(({ title, url }) => (
                <li key={title}>
                  <Link href={url}>
                    <a>{title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
