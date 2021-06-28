import Link from 'next/link';

import { ArrowRightIcon } from './icons';

export type PanelProps = {
  groups: {
    label: string;
    links: { title: string; url: string }[];
  }[];
};

export function Panel({ groups }: PanelProps) {
  return (
    <div className="flex items-start px-6 py-3 text-sm transition-shadow duration-150 ease-in-out rounded-md shadow-xl hover:shadow-2xl">
      <table className="w-full table-fixed">
        {groups.map(({ label, links }) => (
          <tr key={label}>
            <td className="w-32 py-3 pr-4 font-semibold text-blue-600 align-top">
              {label}
            </td>
            <td className="flex-1 align-top">
              {links.map(({ title, url }) => (
                <div key={title} className="py-3 border-t border-gray-100 first:border-0">
                  <Link href={url}>
                    <a className="flex items-start w-full space-x-3 group hover:underline">
                      <span className="flex-1">{title}</span>
                      <ArrowRightIcon className="h-4 mt-0.5 text-gray-300 text-opacity-0 transition duration-150 ease-in-out transform -translate-x-2 group-hover:translate-x-0 group-hover:text-opacity-100" />
                    </a>
                  </Link>
                </div>
              ))}
            </td>
          </tr>
        ))}
      </table>
    </div>
  )
}
