import {
  CustomTable,
  CustomTableDataCell,
  CustomTableHeader,
  CustomTableHeaderCell,
  CustomTableRow,
} from './Table';
import { InlineCode } from './InlineCode';
import { Bundle } from '../utils';

type BundleSizeTableProps = {
  bundles: Array<Bundle>;
};

type BundleSizeProps = {
  bundles: Array<Bundle>;
  pkg: string;
  version: Exclude<keyof Bundle, 'pkg' | 'name'>;
};

function toKilobytes(sizeinBytes: number) {
  return sizeinBytes / 1024;
}

export function BundleSize({ bundles, pkg, version }: BundleSizeProps) {
  const bundle = bundles.find((bundle) => bundle.pkg === pkg);
  const size = bundle?.[version];

  if (size) {
    return <>{toKilobytes(size).toFixed(1)} KB</>;
  }

  return <>{'-'}</>;
}

export function BundleSizeTable({ bundles }: BundleSizeTableProps) {
  return (
    <CustomTable>
      <>
        <CustomTableHeader>
          <CustomTableRow>
            <>
              <CustomTableHeaderCell>
                <></>
              </CustomTableHeaderCell>
              <CustomTableHeaderCell align="right">
                <>Development</>
              </CustomTableHeaderCell>
              <CustomTableHeaderCell align="right">
                <>Minified</>
              </CustomTableHeaderCell>
              <CustomTableHeaderCell align="right">
                <>Gzip</>
              </CustomTableHeaderCell>
              <CustomTableHeaderCell align="right">
                <>Brotli</>
              </CustomTableHeaderCell>
            </>
          </CustomTableRow>
        </CustomTableHeader>
        <tbody>
          {bundles.slice().reverse().map(({ name, development, minified, gzip, brotli }) => {
            return (
              <CustomTableRow key={name}>
                <>
                  <CustomTableDataCell>
                    <InlineCode>
                      <>{name}</>
                    </InlineCode>
                  </CustomTableDataCell>
                  <CustomTableDataCell align="right">
                    <span className="pl-8 whitespace-nowrap">
                      {toKilobytes(development).toFixed(1)} KB
                    </span>
                  </CustomTableDataCell>
                  <CustomTableDataCell align="right">
                    <span className="pl-8 whitespace-nowrap">
                      {toKilobytes(minified).toFixed(1)} KB
                    </span>
                  </CustomTableDataCell>
                  <CustomTableDataCell align="right">
                    <span className="pl-8 whitespace-nowrap">
                      {toKilobytes(gzip).toFixed(1)} KB
                    </span>
                  </CustomTableDataCell>
                  <CustomTableDataCell align="right">
                    <span className="pl-8 whitespace-nowrap">
                      {toKilobytes(brotli).toFixed(1)} KB
                    </span>
                  </CustomTableDataCell>
                </>
              </CustomTableRow>
            );
          })}
        </tbody>
      </>
    </CustomTable>
  );
}
