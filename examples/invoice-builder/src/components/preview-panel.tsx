import type { InvoiceData } from '@/lib/invoice-types';
import {
  invoiceSubtotal,
  discountAmount,
  taxAmount,
  grandTotal,
  lineTotal,
  formatMoney,
  formatCents,
} from '@/lib/money';

interface PreviewPanelProps {
  invoice: InvoiceData;
}

export function PreviewPanel({ invoice }: PreviewPanelProps) {
  const { currency } = invoice;
  const subtotal = invoiceSubtotal(invoice.lineItems, currency);
  const discount = discountAmount(
    subtotal,
    invoice.discountType,
    invoice.discountValue,
    currency
  );
  const tax = taxAmount(subtotal, discount, invoice.taxRate, currency);
  const total = grandTotal(subtotal, discount, tax);

  const hasDiscount = invoice.discountValue > 0;
  const hasTax = invoice.taxRate > 0;

  return (
    <div className="flex flex-col items-center gap-4 p-4 sm:p-6">
      <div
        id="invoice-preview"
        className="w-full max-w-170 rounded-lg bg-white shadow-2xl shadow-black/20 print-only"
        style={{ color: '#1a1a2e' }}
      >
        <div className="p-5 sm:p-10">
          <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="flex-1 min-w-0">
              {invoice.businessLogo && (
                <img
                  src={invoice.businessLogo}
                  alt="Business logo"
                  width={140}
                  height={48}
                  className="mb-3 h-12 w-auto max-w-35 object-contain"
                />
              )}
              <h1 className="text-xl font-bold" style={{ color: '#1a1a2e' }}>
                {invoice.businessName || 'Your Company'}
              </h1>
              {invoice.businessAddress && (
                <p className="mt-1 text-sm" style={{ color: '#6b7280' }}>
                  {invoice.businessAddress}
                </p>
              )}
              {invoice.businessEmail && (
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  {invoice.businessEmail}
                </p>
              )}
            </div>

            <div className="sm:text-right">
              <h2
                className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase"
                style={{ color: '#4466ff' }}
              >
                Invoice
              </h2>
              <p
                className="mt-1 text-sm font-medium"
                style={{ color: '#6b7280' }}
              >
                {invoice.invoiceNumber}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: '#9ca3af' }}
              >
                Bill To
              </p>
              <p
                className="mt-1 text-sm font-semibold"
                style={{ color: '#1a1a2e' }}
              >
                {invoice.clientName || 'Client Name'}
              </p>
              {invoice.clientAddress && (
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  {invoice.clientAddress}
                </p>
              )}
              {invoice.clientEmail && (
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  {invoice.clientEmail}
                </p>
              )}
            </div>

            <div className="sm:text-right">
              <div className="flex flex-col gap-1">
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#9ca3af' }}
                  >
                    Issue Date
                  </p>
                  <p className="text-sm" style={{ color: '#1a1a2e' }}>
                    {formatDate(invoice.issueDate)}
                  </p>
                </div>
                <div className="mt-2">
                  <p
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#9ca3af' }}
                  >
                    Due Date
                  </p>
                  <p className="text-sm" style={{ color: '#1a1a2e' }}>
                    {formatDate(invoice.dueDate)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 -mx-5 px-5 overflow-x-auto sm:mx-0 sm:px-0">
            <table className="w-full text-sm min-w-80">
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th
                    className="pb-3 text-left text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#9ca3af' }}
                  >
                    Description
                  </th>
                  <th
                    className="pb-3 text-right text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#9ca3af', width: '60px' }}
                  >
                    Qty
                  </th>
                  <th
                    className="pb-3 text-right text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#9ca3af', width: '110px' }}
                  >
                    Unit Price
                  </th>
                  <th
                    className="pb-3 text-right text-xs font-semibold uppercase tracking-wider"
                    style={{ color: '#9ca3af', width: '110px' }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.lineItems.map((item, i) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: '1px solid #f3f4f6',
                      backgroundColor: i % 2 === 0 ? 'transparent' : '#f9fafb',
                    }}
                  >
                    <td className="py-3 pr-4" style={{ color: '#1a1a2e' }}>
                      {item.description || 'Untitled item'}
                    </td>
                    <td
                      className="py-3 text-right tabular-nums"
                      style={{ color: '#4b5563' }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      className="py-3 text-right tabular-nums"
                      style={{ color: '#4b5563' }}
                    >
                      {formatCents(item.unitPriceCents, currency)}
                    </td>
                    <td
                      className="py-3 text-right font-medium tabular-nums"
                      style={{ color: '#1a1a2e' }}
                    >
                      {formatMoney(lineTotal(item, currency), currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <div className="w-full sm:w-64">
              <div
                className="flex items-center justify-between py-2 text-sm"
                style={{ borderBottom: '1px solid #f3f4f6' }}
              >
                <span style={{ color: '#6b7280' }}>Subtotal</span>
                <span
                  className="font-medium tabular-nums"
                  style={{ color: '#1a1a2e' }}
                >
                  {formatMoney(subtotal, currency)}
                </span>
              </div>

              {hasDiscount && (
                <div
                  className="flex items-center justify-between py-2 text-sm"
                  style={{ borderBottom: '1px solid #f3f4f6' }}
                >
                  <span style={{ color: '#6b7280' }}>
                    Discount
                    {invoice.discountType === 'percentage'
                      ? ` (${invoice.discountValue}%)`
                      : ''}
                  </span>
                  <span
                    className="font-medium tabular-nums"
                    style={{ color: '#ef4444' }}
                  >
                    {'-'}
                    {formatMoney(discount, currency)}
                  </span>
                </div>
              )}

              {hasTax && (
                <div
                  className="flex items-center justify-between py-2 text-sm"
                  style={{ borderBottom: '1px solid #f3f4f6' }}
                >
                  <span style={{ color: '#6b7280' }}>
                    Tax ({invoice.taxRate}%)
                  </span>
                  <span
                    className="font-medium tabular-nums"
                    style={{ color: '#1a1a2e' }}
                  >
                    {formatMoney(tax, currency)}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between py-3">
                <span
                  className="text-sm font-bold"
                  style={{ color: '#1a1a2e' }}
                >
                  Total
                </span>
                <span
                  className="text-xl font-extrabold tabular-nums"
                  style={{ color: '#4466ff' }}
                >
                  {formatMoney(total, currency)}
                </span>
              </div>
            </div>
          </div>

          {invoice.notes && (
            <div
              className="mt-8 rounded-md p-4"
              style={{
                backgroundColor: '#f9fafb',
                borderLeft: '3px solid #4466ff',
              }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: '#9ca3af' }}
              >
                Notes
              </p>
              <p
                className="mt-1 text-sm whitespace-pre-wrap"
                style={{ color: '#6b7280' }}
              >
                {invoice.notes}
              </p>
            </div>
          )}

          <div className="mt-10 text-center">
            <p className="text-xs" style={{ color: '#d1d5db' }}>
              Thank you for your business
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatDate(value: string): string {
  if (!value) {
    return '';
  }

  const d = new Date(value + 'T00:00:00');

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}
