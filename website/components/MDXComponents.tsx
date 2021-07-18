import { useRouter } from 'next/router';
import { useState } from 'react';
import reactToText from 'react-to-text';
import { useCopyToClipboard } from 'react-use';
import cx from 'classnames';

import {
  CustomFigure,
  FullWidthImage,
  ExternalLink,
  InternalLink,
  Alert,
  AlertProps,
  Parameters,
  Panel,
  Parameter,
  Scrollable,
} from '.';
import { ClipboardCheckIcon, ClipboardIcon, LinkIcon } from './icons';
import { PanelProps } from './Panel';
import { InlineCode } from './InlineCode';
import {
  CustomTable,
  CustomTableDataCell,
  CustomTableHeader,
  CustomTableHeaderCell,
  CustomTableRow,
} from './Table';

export type MDXComponentProps<TAttribute, TElement> = React.DetailedHTMLProps<
  TAttribute,
  TElement
> & {
  children: React.ReactElement,
};

function CustomLink(
  props: MDXComponentProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) {
  const { href, children } = props;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));
  const containsImage = children?.props?.originalType === 'img';
  const containsInlineCode = children?.props?.originalType === 'inlineCode';
  const LinkComponent = isInternalLink ? InternalLink : ExternalLink;

  if (containsImage) {
    const { alt, src } = children?.props;

    return (
      <CustomFigure alt={alt}>
        <LinkComponent {...props}>
          <FullWidthImage alt={alt} src={src} />
        </LinkComponent>
      </CustomFigure>
    );
  }

  return (
    <LinkComponent
      className={cx('text-blue-500', {
        'hover:underline': !containsInlineCode,
      })}
      {...props}
    />
  );
}

function ButtonLink(
  props: MDXComponentProps<React.HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
) {
  return (
    <CustomLink {...props} className="inline-block px-8 py-5 text-gray-600 transition duration-100 ease-in-out rounded-full shadow hover:text-gray-800 bg-gradient-to-b from-white to-gray-50 hover:shadow-lg" />
  );
}

function CenterBlock(
  props: MDXComponentProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return <div {...props} className="mt-6 text-center" />
}

function CustomEmphasis(
  props: MDXComponentProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return <em {...props} />;
}

function HeadingAnchor({
  id,
  className,
  children,
}: MDXComponentProps<
  React.HTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) {
  const { asPath } = useRouter();
  const [, copyToClipboard] = useCopyToClipboard();
  const [pathname] = asPath.split('#');
  const url = [pathname, id].filter(Boolean).join('#');
  const label = 'Copy link';

  function onClick() {
    if (window !== undefined) {
      copyToClipboard([window.location.origin, url].join(''));
    }
  }

  return (
    <span className="relative pl-8 -ml-8 group">
      <a
        href={url}
        onClick={onClick}
        title={label}
        className="absolute -ml-6 font-normal text-gray-400 transition-opacity duration-100 ease-in-out opacity-0 select-none focus:text-blue-400 group-hover:opacity-100"
      >
        <LinkIcon className={className} />
        <span className="sr-only">{label}</span>
      </a>
      {children}
    </span>
  );
}

function CustomHeading2(
  props: MDXComponentProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  const { children, ...rest } = props;

  return (
    <h2 {...rest} className="mt-12 text-2xl font-semibold text-gray-800">
      <HeadingAnchor id={rest.id || ''} className="w-5 h-5 mt-1.5">
        {children}
      </HeadingAnchor>
    </h2>
  );
}

function CustomHeading3(
  props: MDXComponentProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  const { children, ...rest } = props;

  return (
    <h3 {...rest} className="mt-10 text-xl font-semibold text-gray-800">
      <HeadingAnchor id={rest.id || ''} className="w-4 h-4 mt-1.5">
        {children}
      </HeadingAnchor>
    </h3>
  );
}

function CustomHeading4(
  props: MDXComponentProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  const { children, ...rest } = props;

  return (
    <h4 {...rest} className="mt-6 text-lg font-semibold text-gray-800">
      <HeadingAnchor id={rest.id || ''} className="w-4 h-4 mt-1.5">
        {children}
      </HeadingAnchor>
    </h4>
  );
}

function Image({
  src,
  alt,
}: MDXComponentProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) {
  if (src === undefined) {
    return null;
  }

  return (
    <div className="mt-6 tracking-normal" style={{ wordSpacing: 0, fontSize: 0 }}>
      <FullWidthImage alt={alt} src={src} />
    </div>
  );
}

function CustomImage({
  src,
  alt,
}: MDXComponentProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) {
  if (src === undefined) {
    return null;
  }

  return (
    <div className="mt-6">
      <CustomFigure alt={alt}>
        <FullWidthImage alt={alt} src={src} />
      </CustomFigure>
    </div>
  );
}

function CustomKeyboardInput(
  props: MDXComponentProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return <kbd {...props} />;
}

function CustomPreformattedText(
  props: MDXComponentProps<React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>
) {
  const code = reactToText(props.children);
  const [state, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);

  const buttonText = copied ? 'Copied!' : 'Copy';
  const Icon = copied ? ClipboardCheckIcon : ClipboardIcon;

  return (
    <div className="relative mt-6 group">
      <button
        className={cx(
          'border-gray-300 border bg-gradient-to-b from-gray-50 to-gray-100 p-2 shadow hover:shadow-md rounded flex absolute pointer-events-auto top-0 right-0 items-center mt-6 mr-8 text-sm transition duration-100 ease-in-out focus:outline-none group-hover:opacity-100',
          {
            'text-gray-400 hover:text-gray-600 opacity-0': !copied,
            'text-blue-400': copied,
          }
        )}
        type="button"
        title={buttonText}
        onClick={() => {
          copyToClipboard(code);
          setCopied(true);

          setTimeout(() => {
            setCopied(false);
          }, 3000);
        }}
      >
        <span className="sr-only">
          {state.error ? "Couldn't copy, try manually" : buttonText}
        </span>
        {!state.error && <Icon className="h-5" />}
      </button>
      <div className="p-8 overflow-x-scroll font-mono text-sm leading-relaxed rounded bg-gray-50">
        <pre {...props} />
      </div>
    </div>
  );
}

function CustomStrong(
  props: MDXComponentProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return <strong {...props} />;
}
function CustomParagraph(
  props: MDXComponentProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) {
  return <p {...props} className="mt-6" />;
}

function CustomUnorderedList(
  props: MDXComponentProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  >
) {
  return <ul {...props} className="mt-2" />;
}

function CustomUnorderedListItem(
  props: MDXComponentProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
) {
  return (
    <li
      {...props}
      data-content="•"
      className="relative pl-5 before:content before:absolute before:left-0 before:text-gray-400"
    />
  );
}

function CustomOrderedList(
  props: MDXComponentProps<
    React.OlHTMLAttributes<HTMLOListElement>,
    HTMLOListElement
  >
) {
  return (
    <ol
      className="mt-6 text-gray-300 text-opacity-80 list-counter-reset"
      {...props}
    />
  );
}

function CustomOrderedListItem(
  props: MDXComponentProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
) {
  return (
    <li
      className="relative ml-6 list-counter-increment after:list-counter-result after:absolute after:block after:text-sm after:left-0 after:top-0 after:mt-0.5 after:-ml-6 after:leading-loose after:text-gray-600"
      {...props}
    />
  );
}

function CustomAlert(props: AlertProps) {
  return (
    <div className="my-8 last:mb-0">
      <Alert {...props} />
    </div>
  );
}

function CustomPanel(props: PanelProps) {
  return (
    <div className="my-8 last:mb-0">
      <Panel {...props} />
    </div>
  );
}

export const MDXComponents = {
  Alert: CustomAlert,
  ButtonLink,
  CenterBlock,
  Image,
  Link: CustomLink,
  Panel: CustomPanel,
  Parameters,
  Parameter,
  Scrollable,
  a: CustomLink,
  em: CustomEmphasis,
  h2: CustomHeading2,
  h3: CustomHeading3,
  h4: CustomHeading4,
  img: CustomImage,
  inlineCode: InlineCode,
  kbd: CustomKeyboardInput,
  ol: CustomOrderedList,
  'ol.li': CustomOrderedListItem,
  p: CustomParagraph,
  pre: CustomPreformattedText,
  strong: CustomStrong,
  table: CustomTable,
  td: CustomTableDataCell,
  th: CustomTableHeaderCell,
  thead: CustomTableHeader,
  tr: CustomTableRow,
  ul: CustomUnorderedList,
  'ul.li': CustomUnorderedListItem,
};
