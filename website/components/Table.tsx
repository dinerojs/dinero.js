import cx from 'classnames';

import type { MDXComponentProps } from './MDXComponents';

type AlignProps = { readonly align?: 'left' | 'right' };

export function CustomTable(
  props: MDXComponentProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  >
) {
  return <table {...props} className="w-full mt-6" />;
}

export function CustomTableHeader(
  props: MDXComponentProps<
    React.HTMLAttributes<HTMLTableSectionElement>,
    HTMLTableSectionElement
  >
) {
  return <thead {...props} />;
}

export function CustomTableHeaderCell({
  align,
  ...props
}: MDXComponentProps<
  React.ThHTMLAttributes<HTMLTableHeaderCellElement>,
  AlignProps & HTMLTableHeaderCellElement
>) {
  return (
    <th
      {...props}
      className={cx('px-0 py-4 text-sm font-semibold text-left text-gray-400', {
        'text-right': align === 'right',
      })}
    />
  );
}

export function CustomTableDataCell({
  align,
  ...props
}: MDXComponentProps<
  React.TdHTMLAttributes<HTMLTableDataCellElement>,
  AlignProps & HTMLTableDataCellElement
>) {
  return (
    <td
      {...props}
      className={cx('px-0 py-4 text-sm align-top border-t border-gray-200', {
        'text-right': align === 'right',
      })}
    />
  );
}

export function CustomTableRow(
  props: MDXComponentProps<
    React.HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >
) {
  return <tr {...props} />;
}
