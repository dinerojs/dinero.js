import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useClickAway } from 'react-use';
import cx from 'classnames';
import { DocSearch } from '@docsearch/react';

import '@docsearch/css';

import { tree } from '../data';
import { Heading } from '../utils';
import { ExternalLink, InternalLink, Logo } from '../components';
import { getNext, getPrevious, Sitemap } from '../utils/sitemap';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  CloseIcon,
  GitHubIcon,
  MenuIcon,
} from '../components/icons';
import pkg from '../../package.json';

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

  if (level === 0) {
    return null;
  }

  if (path && node.children.length === 0) {
    return (
      <Link
        href={path}
        className={`block py-1 transition-colors duration-100 ease-in-out ${cx({
          'text-blue-400 hover:text-blue-500': isActive,
          'text-gray-600 hover:text-gray-700 text-opacity-90': !isActive,
        })}`}
      >
        {label}
      </Link>
    );
  }

  if (isRootLevel) {
    const isOpen = buttonProps['aria-expanded'];

    return (
      <button
        className="flex items-center justify-between w-full py-2 space-x-2 font-semibold text-left text-gray-900 transition-colors duration-100 ease-in-out group hover:text-gray-800 focus:outline-none"
        onClick={onClick}
        {...buttonProps}
      >
        {label}
        <ChevronDownIcon
          className={`group-hover:text-gray-500 transition-colors duration-100 ease-in-out h-4 text-gray-400 ${cx(
            {
              'transform rotate-180': isOpen,
            }
          )}`}
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
  children: React.ReactNode;
  node: Sitemap;
  isActive: boolean;
  navScrollRef: MutableRefObject<HTMLDivElement | null>;
};

function SidebarNodeWrapper({
  children,
  node,
  isActive,
  navScrollRef,
}: SidebarNodeWrapper) {
  const { asPath } = useRouter();
  const nodeRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (isActive && navScrollRef.current && nodeRef.current) {
      navScrollRef.current.scrollTo({
        top: nodeRef.current.offsetTop,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [asPath]);

  if (node.resource?.label) {
    return <li ref={nodeRef}>{children}</li>;
  }

  return <>{children}</>;
}

type SidebarNodeProps = {
  node: Sitemap;
  level: number;
  navScrollRef: MutableRefObject<HTMLDivElement | null>;
  isNodeActive: (node: Sitemap) => boolean;
};

function SidebarNode({
  node,
  level,
  navScrollRef,
  isNodeActive,
}: SidebarNodeProps) {
  const { asPath } = useRouter();
  const isFirstLevel = level === 1;
  const initialIsExpanded = !isFirstLevel || hasActiveChild(node);
  const [isExpanded, setIsExpanded] = useState(initialIsExpanded);

  useEffect(() => {
    setIsExpanded(initialIsExpanded);
  }, [asPath]);

  const id = node.resource?.label
    ?.toLowerCase()
    .replace(/\s/g, '-')
    .replace('?', '');
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
    <SidebarNodeWrapper
      node={node}
      navScrollRef={navScrollRef}
      isActive={isNodeActive(node)}
    >
      <>
        {node.resource?.label ? (
          <SidebarItem
            onClick={() =>
              setIsExpanded((currentIsExpanded) => !currentIsExpanded)
            }
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
            id={childId}
            {...(level > 0 && { 'aria-labelledby': parentId })}
            data-foo={level}
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
                navScrollRef={navScrollRef}
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navRef = useRef(null);
  const navScrollRef = useRef(null);
  const navButtonRef = useRef(null);

  const sites = {
    v2: {
      label: `v${pkg.version}`,
      url: 'https://v2.dinerojs.com/',
    },
    v1: {
      label: 'v1.8.1',
      url: 'https://v1.dinerojs.com/',
    },
  };
  const versions = Object.keys(sites);

  useEffect(() => {
    document
      .querySelector('body')
      ?.classList.toggle('overflow-hidden', isSidebarOpen);
  }, [isSidebarOpen]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [asPath]);

  useClickAway(navRef, (event) => {
    const clickedNavButton = event.target === navButtonRef.current;

    if (!clickedNavButton) {
      setIsSidebarOpen(false);
    }
  });

  const current = tree.fromUrl(
    asPath.replace('/docs', 'docs').replace(/(#.+)/, '')
  );

  const previous = getPrevious(current);
  const next = getNext(current);

  function isNodeActive({ resource }: Sitemap) {
    const [path] = asPath.split('#');

    return path === resource?.path;
  }

  return (
    <div className="relative font-sans text-base leading-normal text-gray-800 bg-white">
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="h-full col-span-1 bg-gray-100" />
        <div className="h-full col-span-1 bg-white" />
      </div>
      <div className="sticky top-0 z-20">
        <div className="relative z-30 px-4 py-2 text-xs text-center bg-blue-400 text-blue-50 sm:text-sm">
          <span className="hidden md:inline">
            You're browsing the documentation for v{pkg.version}. Things might
            break!
          </span>{' '}
          <ExternalLink
            href="https://v1.dinerojs.com/"
            className="font-semibold text-white hover:underline"
          >
            Click here for v1.x documentation
          </ExternalLink>
          .
        </div>
        <header className="relative z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6 mx-auto space-x-4 max-w-screen-2xl">
            <Link href="/docs" className="flex space-x-2">
              <Logo className="h-6" />
              <span className="mt-px font-semibold">Dinero.js</span>
            </Link>
            <div className="flex items-center mt-px space-x-6 text-sm">
              <form>
                <span className="sr-only">Dinero.js version</span>
                <select
                  className="py-1 pr-1"
                  value={versions[0]}
                  onChange={(event) => {
                    const { url } = sites[event.target.value as 'v1' | 'v2'];

                    if (url !== undefined) {
                      window.location.assign(url);
                    }
                  }}
                >
                  {versions.map((version) => (
                    <option key={version} value={version}>
                      {sites[version as 'v1' | 'v2'].label}
                    </option>
                  ))}
                </select>
              </form>
              <ExternalLink
                className="items-center hidden space-x-2 sm:flex group"
                href="https://github.com/dinerojs/dinero.js"
              >
                <GitHubIcon className="h-4 text-gray-400 transition-colors duration-100 ease-in-out text-opacity-80 group-hover:text-opacity-100" />
                <span className="text-gray-800 transition-colors duration-100 ease-in-out text-opacity-80 group-hover:text-opacity-100">
                  GitHub
                </span>
              </ExternalLink>
              <InternalLink
                className="hidden text-gray-800 transition-colors duration-100 ease-in-out sm:inline-block text-opacity-80 hover:text-opacity-100"
                href="/docs/sandboxes"
              >
                Sandboxes
              </InternalLink>
              <InternalLink
                className="hidden text-gray-800 transition-colors duration-100 ease-in-out sm:inline-block text-opacity-80 hover:text-opacity-100"
                href="/docs/about"
              >
                About
              </InternalLink>
              <DocSearch
                appId="UV1B3CJN3X"
                apiKey="88540da8c96ccf8fe8dc0904c8d6c89c"
                indexName="dinerojs"
                searchParameters={{ facetFilters: ['tags:v2'] }}
              />
            </div>
          </div>
        </header>
      </div>
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
          <div
            ref={navScrollRef}
            className="sticky flex flex-col justify-between h-full px-6 pt-12 pb-6 overflow-y-scroll sm:pt-0 top-32 max-h-screen-16 sm:max-h-screen-32"
          >
            <div className="sm:-my-1">
              <SidebarNode
                node={tree}
                level={-1}
                navScrollRef={navScrollRef}
                isNodeActive={isNodeActive}
              />
            </div>
            <div className="flex mt-6 space-x-6 sm:hidden">
              <ExternalLink
                className="flex items-center space-x-2 group"
                href="https://github.com/dinerojs/dinero.js"
              >
                <GitHubIcon className="h-4 text-gray-400 transition-colors duration-100 ease-in-out text-opacity-80 group-hover:text-opacity-100" />
                <span className="text-gray-800 transition-colors duration-100 ease-in-out text-opacity-80 group-hover:text-opacity-100">
                  GitHub
                </span>
              </ExternalLink>
              <InternalLink
                className="text-gray-800 transition-colors duration-100 ease-in-out text-opacity-80 hover:text-opacity-100"
                href="/docs/sandboxes"
              >
                Sandboxes
              </InternalLink>
              <InternalLink
                className="text-gray-800 transition-colors duration-100 ease-in-out text-opacity-80 hover:text-opacity-100"
                href="/docs/about"
              >
                About
              </InternalLink>
            </div>
          </div>
        </nav>
        <div className="flex flex-col col-span-10 px-6 pt-6 pb-24 sm:px-10 sm:pt-10 sm:pb-6 sm:col-span-7 lg:col-span-6">
          <article className="flex-1 text-gray-600">{children}</article>
          {(previous || next) && (
            <nav className="mt-10">
              <ul className="flex justify-between">
                <li className="flex flex-none w-1/2 text-left">
                  {previous && (
                    <Link
                      href={previous.resource?.path as string}
                      aria-label={`Go to ${previous.resource?.label}`}
                      className="flex items-center flex-none w-full space-x-4 group"
                    >
                      <ArrowLeftIcon className="flex-none h-4 transition-transform duration-100 ease-in-out transform group-hover:-translate-x-1" />
                      <div className="flex flex-col self-start space-y-1">
                        <span className="text-sm text-gray-500 transition-colors duration-100 ease-in-out group-hover:text-gray-700">
                          Previous
                        </span>
                        <span className="font-semibold text-gray-800 transition-colors duration-100 ease-in-out group-hover:text-gray-900">
                          {previous.resource?.label}
                        </span>
                      </div>
                    </Link>
                  )}
                </li>
                <li className="flex justify-end flex-none w-1/2 text-right">
                  {next && (
                    <Link
                      href={next.resource?.path as string}
                      aria-label={`Go to ${next.resource?.label}`}
                      className="flex items-center justify-end flex-none w-full space-x-4 group"
                    >
                      <div className="flex flex-col self-start space-y-1">
                        <span className="text-sm text-gray-500 transition-colors duration-100 ease-in-out group-hover:text-gray-700">
                          Next
                        </span>
                        <span className="font-semibold text-gray-800 transition-colors duration-100 ease-in-out group-hover:text-gray-900">
                          {next.resource?.label}
                        </span>
                      </div>
                      <ArrowRightIcon className="flex-none h-4 transition-transform duration-100 ease-in-out transform group-hover:translate-x-1" />
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          )}
          <footer className="col-span-2 pt-16 text-sm text-center text-gray-500">
            <ExternalLink
              href="https://vercel.com/?utm_source=dinerojs&amp;utm_campaign=oss"
              className="inline-flex items-center space-x-0.5"
            >
              <div>Powered by</div>
              <span className="sr-only"> Vercel</span>
              <svg
                aria-hidden={true}
                className="h-4 mt-0.5"
                viewBox="0 0 284 65"
              >
                <path d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48h10.39l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9v-34h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"></path>
              </svg>
            </ExternalLink>
          </footer>
        </div>
        {(headings?.length ?? 0) > 0 && (
          <div className="hidden col-span-2 px-6 pb-6 lg:block">
            <div className="sticky z-20 pt-2 pb-6 overflow-y-scroll top-32 max-h-screen-32">
              <h2 className="py-3 text-xs font-semibold tracking-wide uppercase">
                On this page
              </h2>
              <ul className="mt-2 text-sm">
                {headings?.map(({ text, slug, level }) => (
                  <li
                    key={slug}
                    className={cx('py-2', { 'ml-4': level === 3 })}
                  >
                    <Link
                      href={`#${slug}`}
                      className="text-gray-400 transition-colors duration-100 ease-in-out hover:text-gray-600"
                    >
                      {text}
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
