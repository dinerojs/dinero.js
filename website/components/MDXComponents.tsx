import Image from 'next/image';
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
} from '.';
import { ClipboardCheckIcon, ClipboardIcon } from './icons';

type MDXComponentProps<TAttribute, TElement> = React.DetailedHTMLProps<
  TAttribute,
  TElement
> & {
  children: React.ReactElement;
};

function CustomLink(
  props: MDXComponentProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) {
  const { href, children } = props;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));
  const containsImage = children?.props?.originalType;
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

  return <LinkComponent {...props} />;
}

function CustomEmphasis(
  props: MDXComponentProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return <em {...props} />;
}

function CustomHeading2(
  props: MDXComponentProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return <h2 {...props} className="mt-12 text-2xl font-semibold text-gray-800" />;
}

function CustomHeading3(
  props: MDXComponentProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return <h3 {...props} className="mt-10 text-xl font-semibold text-gray-800" />;
}

function CustomHeading4(
  props: MDXComponentProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return <h4 {...props} className="mt-6 text-lg font-semibold text-gray-800" />;
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
    <CustomFigure alt={alt}>
      <FullWidthImage alt={alt} src={src} />
    </CustomFigure>
  );
}

function CustomInlineCode(
  props: MDXComponentProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return <code {...props} className="text-sm" />;
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
        className={cx('hidden md:flex absolute pointer-events-auto top-0 right-0 items-center mt-8 mr-8 space-x-1 text-sm transition duration-100 ease-in-out focus:outline-none group-hover:opacity-100', { 'text-gray-400 hover:text-gray-600 opacity-0': !copied, 'text-blue-600': copied })}
        type="button"
        title={buttonText}
        onClick={() => {
          copyToClipboard(code);
          setCopied(true);

          setTimeout(() => {
            setCopied(false);
          }, 5000);
        }}
      >
        <span className={cx({ 'sr-only': !copied })}>{state.error ? "Couldn't copy, try manually" : buttonText}</span>
        {!state.error && <Icon className="h-5" />}
      </button>
      <div className="p-8 overflow-x-scroll font-mono text-sm leading-relaxed bg-gray-100 rounded">
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

function CustomTable(
  props: MDXComponentProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >
) {
  return <table {...props} />;
}

function CustomTableHeader(
  props: MDXComponentProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
) {
  return <thead {...props} />;
}

function CustomTableHeaderCell(
  props: MDXComponentProps<
    React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >
) {
  return <th {...props} className="align-top" />;
}

function CustomTableDataCell(
  props: MDXComponentProps<
    React.TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >
) {
  return <td {...props} />;
}

function CustomTableRow(
  props: MDXComponentProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >
) {
  return <tr {...props} />;
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
  return <ul {...props} />;
}

function CustomUnorderedListItem(
  props: MDXComponentProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
) {
  return <li {...props} />;
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
    <div className="mt-6">
      <Alert {...props} />
    </div>
  )
}

export const MDXComponents = {
  Alert: CustomAlert,
  Image,
  Panel,
  Parameters,
  Parameter,
  a: CustomLink,
  em: CustomEmphasis,
  h2: CustomHeading2,
  h3: CustomHeading3,
  h4: CustomHeading4,
  img: CustomImage,
  inlineCode: CustomInlineCode,
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
