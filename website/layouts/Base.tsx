import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useClickAway } from 'react-use';
import cx from 'classnames';

import { tree } from '../data';
import { Heading } from '../utils';
import { Logo } from '../components';
import { getNext, getPrevious, Sitemap } from '../utils/sitemap';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  CloseIcon,
  GitHubIcon,
  MenuIcon,
} from '../components/icons';

type SidebarItemProps = {
  node: Sitemap,
  level: number,
  onClick: () => void,
  isNodeActive: (node: Sitemap) => boolean,
  buttonProps: Pick<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'aria-expanded' | 'aria-controls' | 'id'
  >,
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
        <a
          className={`block py-1 transition-colors duration-100 ease-in-out ${cx(
            {
              'text-blue-600 hover:text-blue-700': isActive,
              'text-gray-400 hover:text-gray-500': !isActive,
            }
          )}`}
        >
          {label}
        </a>
      </Link>
    );
  }

  if (isRootLevel) {
    const isOpen = buttonProps['aria-expanded'];

    return (
      <button
        className={`flex text-left items-center justify-between w-full py-2 space-x-2 font-semibold transition-colors duration-100 ease-in-out hover:text-gray-800 focus:outline-none ${cx(
          { 'text-gray-600': !isOpen, 'text-gray-800': isOpen }
        )}`}
        onClick={onClick}
        {...buttonProps}
      >
        {label}
        <ChevronDownIcon
          className={`h-4 text-gray-400 ${cx({
            'transform rotate-180': isOpen,
          })}`}
        />
      </button>
    );
  }

  return (
    <span className="text-xs font-semibold tracking-wide uppercase">
      {label}
    </span>
  );
}

type SidebarNodeWrapper = {
  children: React.ReactNode,
  node: Sitemap,
  isActive: boolean;
};

function SidebarNodeWrapper({ children, node, isActive }: SidebarNodeWrapper) {
  const { asPath } = useRouter();
  const nodeRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (isActive) {
      nodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }, [asPath]);

  if (node.resource?.label) {
    return <li ref={nodeRef}>{children}</li>;
  }

  return <>{children}</>;
}

type SidebarNodeProps = {
  node: Sitemap,
  level: number,
  isNodeActive: (node: Sitemap) => boolean,
};

function SidebarNode({ node, level, isNodeActive }: SidebarNodeProps) {
  const { asPath } = useRouter();
  const isFirstLevel = level === 1;
  const initialIsExpanded = !isFirstLevel || hasActiveChild(node);
  const [isExpanded, setIsExpanded] = useState(initialIsExpanded);

  useEffect(() => {
    setIsExpanded(initialIsExpanded);
  }, [asPath]);

  const id = node.resource?.label?.toLowerCase().replace(/\s/g, '-');
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
    <SidebarNodeWrapper node={node} isActive={isNodeActive(node)}>
      <>
        {node.resource?.label ? (
          <SidebarItem
            onClick={() => setIsExpanded((currentIsExpanded) => !currentIsExpanded)}
            node={node}
            level={level}
            isNodeActive={isNodeActive}
            buttonProps={{
              'aria-controls': childId,
              id: parentId,
              'aria-expanded': isExpanded,
            }}
          />
        ) : null}
        {node.children?.length ? (
          <ul
            role="region"
            id={childId}
            aria-labelledby={parentId}
            className={`my-2 ${cx({
              block: isExpanded,
              hidden: !isExpanded,
            })}`}
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
  children: React.ReactNode,
  headings: Heading[] | undefined,
};

export function Base({ children, headings }: BaseProps) {
  const { asPath } = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navRef = useRef(null);
  const navButtonRef = useRef(null);

  const sites = {
    v1: 'https://v1.dinerojs.com/',
    v2: 'https://dinerojs.com/',
  };

  useEffect(() => {
    document
      .querySelector('body')
      ?.classList.toggle('overflow-hidden', isSidebarOpen);
  });

  useClickAway(navRef, (event) => {
    const clickedNavButton = event.target === navButtonRef.current;

    if (!clickedNavButton) {
      setIsSidebarOpen(false);
    }
  });

  const current = tree.fromUrl(
    asPath.replace('/docs/', '').replace(/(#.+)/, '')
  );

  const previous = getPrevious(current);
  const next = getNext(current);

  function isNodeActive({ resource }: Sitemap) {
    const [path] = asPath.split('#');

    return path === `/docs${resource?.path}`;
  }

  return (
    <div className="relative font-sans text-base leading-normal text-gray-800 bg-white">
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="h-full col-span-1 bg-gray-100" />
        <div className="h-full col-span-1 bg-white" />
      </div>
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-6 mx-auto space-x-4 max-w-screen-2xl">
          <Link href="/">
            <a className="flex space-x-2">
              <Logo className="h-6" />
              <span className="mt-px font-semibold">Dinero.js</span>
            </a>
          </Link>
          <div className="flex mt-px space-x-6 text-sm">
            <form>
              <span className="sr-only">Dinero.js version</span>
              <select className="py-1 pr-1" onChange={(event) => {
                const url = sites[event.target.value as 'v1' | 'v2'];

                if (url !== undefined) {
                  window.location.assign(url);
                }
              }}>
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
              <span className="text-gray-800 transition-colors duration-100 ease-in-out text-opacity-80 group-hover:text-opacity-100">
                GitHub
              </span>
            </a>
          </div>
        </div>
      </header>
      <main className="relative grid grid-cols-10 mx-auto bg-white max-w-screen-2xl min-h-screen-16">
        <nav
          ref={navRef}
          className={cx(
            `bg-gray-100 sm:block sm:col-span-3 lg:col-span-2 sm:relative sm:z-auto sm:top-auto sm:bottom-auto sm:left-auto sm:right-auto sm:mt-0 sm:w-auto sm:shadow-none`,
            {
              'hidden relative': !isSidebarOpen,
              'fixed z-10 top-0 bottom-0 left-0 right-16 mt-16 shadow-2xl':
                isSidebarOpen,
            }
          )}
        >
          <div className="sticky px-6 pb-6 overflow-y-scroll top-24 max-h-screen-16 sm:max-h-screen-24">
            <SidebarNode node={tree} level={0} isNodeActive={isNodeActive} />
          </div>
        </nav>
        <div className="col-span-10 px-8 pb-32 sm:px-10 sm:pb-6 sm:col-span-7 lg:col-span-6 pt-9">
          <div className="text-gray-600">{children}</div>
          {(previous || next) && (
            <nav className="mt-10">
              <ul className="flex justify-between">
                <li className="text-left">
                  {previous && (
                    <Link
                      href={`/docs${previous.resource?.path}`}
                      aria-label={`Go to ${previous.resource?.label}`}
                    >
                      <a className="flex items-center space-x-4 group">
                        <ArrowLeftIcon className="h-4 transition-transform duration-100 ease-in-out transform group-hover:-translate-x-1" />
                        <div className="grid grid-rows-2 gap-1">
                          <span className="text-sm text-gray-500 transition-colors duration-100 ease-in-out group-hover:text-gray-700">
                            Previous
                          </span>
                          <span className="font-semibold text-gray-800 transition-colors duration-100 ease-in-out group-hover:text-gray-900">
                            {previous.resource?.label}
                          </span>
                        </div>
                      </a>
                    </Link>
                  )}
                </li>
                <li className="text-right">
                  {next && (
                    <Link
                      href={`/docs${next.resource?.path}`}
                      aria-label={`Go to ${next.resource?.label}`}
                    >
                      <a className="flex items-center space-x-4 group">
                        <div className="grid grid-rows-2 gap-1">
                          <span className="text-sm text-gray-500 transition-colors duration-100 ease-in-out group-hover:text-gray-700">
                            Next
                          </span>
                          <span className="font-semibold text-gray-800 transition-colors duration-100 ease-in-out group-hover:text-gray-900">
                            {next.resource?.label}
                          </span>
                        </div>
                        <ArrowRightIcon className="h-4 transition-transform duration-100 ease-in-out transform group-hover:translate-x-1" />
                      </a>
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          )}
        </div>
        {(headings?.length ?? 0) > 0 && (
          <div className="hidden col-span-2 px-6 pb-6 lg:block">
            <div className="sticky z-20 pt-2 pb-6 overflow-y-scroll top-24 max-h-screen-24">
              <h2 className="py-3 text-xs font-semibold tracking-wide uppercase">
                On this page
              </h2>
              <ul className="mt-2 text-sm">
                {headings?.map(({ text, slug, level }) => (
                  <li key={slug} className={cx('py-2', { 'ml-4': level === 3 })}>
                    <Link href={`#${slug}`}>
                      <a className="text-gray-400 transition-colors duration-100 ease-in-out hover:text-gray-600">
                        {text}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>
      <button
        ref={navButtonRef}
        className="fixed bottom-0 right-0 z-20 flex items-center justify-center w-16 h-16 mb-8 mr-8 text-gray-100 bg-gray-900 rounded-full sm:hidden"
        onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
      >
        <span className="sr-only">
          {isSidebarOpen ? 'Close site navigation' : 'Open site navigation'}
        </span>
        <MenuIcon
          className={cx('w-8 pointer-events-none', { hidden: isSidebarOpen })}
        />
        <CloseIcon
          className={cx('w-8 pointer-events-none', { hidden: !isSidebarOpen })}
        />
      </button>
    </div>
  );
}
