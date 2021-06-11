import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cx from 'classnames';

import { tree } from '../data';
import { Heading } from '../utils';
import { Logo } from '../components';
import { Sitemap } from '../utils/sitemap';
import { ChevronDownIcon, GitHubIcon } from '../components/icons';

type SidebarItemProps = {
  node: Sitemap;
  level: number;
  onClick: () => void;
  isNodeActive: (node: Sitemap) => boolean;
  buttonProps: Pick<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'aria-expanded' | 'aria-controls' | 'id'
  >;
};

function SidebarItem({
  node,
  level,
  onClick,
  isNodeActive,
  buttonProps,
}: SidebarItemProps) {
  const { path, label } = node.resource || {};
  const isActive = isNodeActive(node);
  const isRootLevel = level === 1;

  if (path && node.children.length === 0) {
    return (
      <Link href={`/docs${path}`}>
        <a className={`block py-1 transition-colors duration-100 ease-in-out ${cx({ 'text-blue-600 hover:text-blue-700': isActive, 'text-gray-400 hover:text-gray-500': !isActive })}`}>{label}</a>
      </Link>
    );
  }

  if (isRootLevel) {
    const isOpen = buttonProps['aria-expanded'];

    return (
      <button className={`flex items-center justify-between w-full py-2 space-x-2 font-semibold transition-colors duration-100 ease-in-out hover:text-gray-800 focus:outline-none ${cx({ 'text-gray-600': !isOpen, 'text-gray-800': isOpen })}`} onClick={onClick} {...buttonProps}>
        {label}
        <ChevronDownIcon className={`h-4 text-gray-400 ${cx({ 'transform rotate-180': isOpen })}`} />
      </button>
    );
  }

  return <span>{label}</span>;
}

type SidebarNodeWrapper = {
  children: React.ReactNode;
  node: Sitemap;
};

function SidebarNodeWrapper({ children, node }: SidebarNodeWrapper) {
  if (node.resource?.label) {
    return <li>{children}</li>;
  }

  return <>{children}</>;
}

type SidebarNodeProps = {
  node: Sitemap;
  level: number;
  isNodeActive: (node: Sitemap) => boolean;
};

function SidebarNode({ node, level, isNodeActive }: SidebarNodeProps) {
  const isFirstLevel = level === 1;
  const [isOpen, setIsOpen] = useState(!isFirstLevel || hasActiveChild(node));

  const id = node.resource?.label?.toLowerCase();
  const parentId = node.resource?.label ? `heading-${id}` : undefined;
  const childId = node.resource?.label ? `navigation-${id}` : undefined;

  function hasActiveChild(node: Sitemap) {
    if (!node.children) {
      return false;
    }

    const hasActiveChildRecursively = node.children.some(
      (node) => isNodeActive(node) || hasActiveChild(node)
    );

    return hasActiveChildRecursively;
  }

  return (
    <SidebarNodeWrapper node={node}>
      <>
        {node.resource?.label ? (
          <SidebarItem
            onClick={() => setIsOpen((currentIsOpen) => !currentIsOpen)}
            node={node}
            level={level}
            isNodeActive={isNodeActive}
            buttonProps={{
              'aria-controls': childId,
              id: parentId,
              'aria-expanded': isOpen,
            }}
          />
        ) : null}
        {node.children?.length ? (
          <ul
            role="region"
            id={childId}
            aria-labelledby={parentId}
            className={`my-2 ${cx({ 'block': isOpen, 'hidden': !isOpen, 'ml-4': isFirstLevel })}`}
          >
            {node.children.map((child, index) => (
              <SidebarNode
                key={index}
                node={child}
                level={level + 1}
                isNodeActive={isNodeActive}
              />
            ))}
          </ul>
        ) : null}
      </>
    </SidebarNodeWrapper>
  );
}

type BaseProps = {
  children: React.ReactNode;
  headings: Heading[] | undefined;
};

export function Base({ children, headings }: BaseProps) {
  const { asPath } = useRouter();
  const [, setIsSidebarOpen] = useState(false);

  const current = tree.fromUrl(asPath.replace('/docs/', '').replace(/(#.+)/, ''));

  const previous =
    current.previous ||
    ((current.parent?.previous ? current.parent : current.root)?.previous?.last
      ?.children.length === 0
      ? (current.parent?.previous ? current.parent : current.root)?.previous
          ?.last
      : (current.parent?.previous ? current.parent : current.root)?.previous
          ?.last?.last);
  const next =
    current.next ||
    ((current.parent?.next ? current.parent : current.root)?.next?.first
      ?.children.length === 0
      ? (current.parent?.next ? current.parent : current.root)?.next?.first
      : (current.parent?.next ? current.parent : current.root)?.next?.first
          ?.first);

  function isNodeActive({ resource }: Sitemap) {
    const [path] = asPath.split('#');

    return path === `/docs${resource?.path}`;
  }

  return (
    <div className="relative font-sans text-base leading-normal text-gray-800 bg-white">
      <header className="sticky top-0 flex items-center justify-between px-6 py-5 space-x-4 bg-white border-b border-gray-200">
        <Link href="/">
          <div className="flex space-x-2">
            <Logo className="h-6" />
            <span className="mt-px font-semibold">Dinero.js</span>
          </div>
        </Link>
        <div className="flex mt-px space-x-6 text-sm">
          <form>
            <span className="sr-only">Dinero.js version</span>
            <select className="py-1 pr-1">
              <option value="v2">v2.0.0</option>
              <option value="v1">v1.8.1</option>
            </select>
          </form>
          <a
            className="flex items-center space-x-2 group"
            href="https://github.com/dinerojs/dinero.js"
            target="_blank"
            rel="noreferrer noopener"
          >
            <GitHubIcon className="h-4 text-gray-400 transition-colors duration-100 ease-in-out text-opacity-80 group-hover:text-opacity-100" />
            <span className="text-gray-800 transition-colors duration-100 ease-in-out text-opacity-80 group-hover:text-opacity-100">GitHub</span>
          </a>
        </div>
      </header>
      <main className="grid grid-cols-10">
        <nav className="col-span-2 px-6 py-6 border-r border-gray-200 bg-gray-50">
          <SidebarNode node={tree} level={0} isNodeActive={isNodeActive} />
        </nav>
        {/* The <div> element captures `click` and `keyup` events to simulate clicks outside the sidebar on small screens */}
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className="col-span-6"
          onClick={() => setIsSidebarOpen(false)}
          onKeyUp={() => setIsSidebarOpen(false)}
        >
          {children}
          {(previous || next) && (
            <nav role="navigation">
              <ul>
                {previous && (
                  <li>
                    <span>Previous: </span>
                    <a
                      href={`/docs${previous.resource?.path}`}
                      aria-label={`Go to ${previous.resource?.label}`}
                    >
                      {previous.resource?.label}
                    </a>
                  </li>
                )}
                {next && (
                  <li>
                    <span>Next: </span>
                    <a
                      href={`/docs${next.resource?.path}`}
                      aria-label={`Go to ${next.resource?.label}`}
                    >
                      {next.resource?.label}
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
        {(headings?.length ?? 0) > 0 && (
          <div className="col-span-2 px-6 pb-6 pt-9">
            <h5 className="py-2 text-xs font-semibold tracking-wide uppercase">On this page</h5>
            <ul className="mt-2 text-sm">
              {headings?.map(({ text, slug, level }) => (
                <li key={slug} className={cx('py-2', { 'ml-4': level === 3 })}>
                  <Link href={`#${slug}`}><a className="text-gray-400 transition-colors duration-100 ease-in-out hover:text-gray-600">{text}</a></Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      {/* <button
        onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
      >
        <span>Menu</span>
      </button> */}
    </div>
  );
}
