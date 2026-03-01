import type {
  InvoiceData,
  CurrencyCode,
  DiscountType,
  LineItem,
} from '@/lib/invoice-types';
import {
  toMinorUnits,
  minorUnitsToInputString,
  lineTotal,
  formatMoney,
} from '@/lib/money';
import {
  Plus,
  Trash2,
  ChevronDown,
  Percent,
  StickyNote,
  Building2,
} from 'lucide-react';

type EditorPanelProps = {
  invoice: InvoiceData;
  onFieldChange: <K extends keyof InvoiceData>(
    field: K,
    value: InvoiceData[K]
  ) => void;
  onAddLineItem: () => void;
  onRemoveLineItem: (id: string) => void;
  onUpdateLineItem: <K extends keyof LineItem>(
    id: string,
    field: K,
    value: LineItem[K]
  ) => void;
  onChangeCurrency: (currency: CurrencyCode) => void;
  onChangeDiscountType: (type: DiscountType) => void;
};

const CURRENCIES: { value: CurrencyCode; label: string }[] = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (\u20AC)' },
  { value: 'GBP', label: 'GBP (\u00A3)' },
  { value: 'JPY', label: 'JPY (\u00A5)' },
];

export function EditorPanel({
  invoice,
  onFieldChange,
  onAddLineItem,
  onRemoveLineItem,
  onUpdateLineItem,
  onChangeCurrency,
  onChangeDiscountType,
}: EditorPanelProps) {
  function onMoneyInput(field: 'discountValue', value: string) {
    if (invoice.discountType === 'percentage') {
      const val = parseFloat(value) || 0;

      onFieldChange(field, Math.max(0, Math.min(100, val)));
    } else {
      onFieldChange(field, toMinorUnits(value, invoice.currency));
    }
  }

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-foreground">
            Invoice Editor
          </h2>
          <p className="text-xs text-text-muted mt-0.5">
            {invoice.invoiceNumber}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={invoice.currency}
            onChange={(e) => onChangeCurrency(e.target.value as CurrencyCode)}
            aria-label="Currency"
            name="currency"
            autoComplete="off"
            className="rounded-md border border-border bg-card px-2 py-1.5 text-xs text-foreground transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          >
            {CURRENCIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg bg-[rgba(255,255,255,0.03)] px-4 py-3 border border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
          <Building2 className="h-4 w-4 text-primary" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {invoice.businessName}
          </p>
          <p className="text-xs text-text-muted truncate">
            {invoice.businessEmail}
          </p>
        </div>
      </div>

      <CollapsibleSection
        title="Client Details"
        icon={ChevronDown}
        defaultOpen={false}
      >
        <div className="flex flex-col gap-3">
          <div>
            <FieldLabel htmlFor="client-name">Name</FieldLabel>
            <TextInput
              id="client-name"
              name="client-name"
              value={invoice.clientName}
              onChange={(v) => onFieldChange('clientName', v)}
              placeholder="John Doe"
              autoComplete="off"
            />
          </div>
          <div>
            <FieldLabel htmlFor="client-address">Address</FieldLabel>
            <TextInput
              id="client-address"
              name="client-address"
              value={invoice.clientAddress}
              onChange={(v) => onFieldChange('clientAddress', v)}
              placeholder="456 Oak Ave, City, State"
              autoComplete="off"
            />
          </div>
          <div>
            <FieldLabel htmlFor="client-email">Email</FieldLabel>
            <TextInput
              id="client-email"
              name="client-email"
              value={invoice.clientEmail}
              onChange={(v) => onFieldChange('clientEmail', v)}
              placeholder="john@example.com"
              type="email"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </CollapsibleSection>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Line Items</h3>
          <span className="text-xs tabular-nums text-text-muted">
            {invoice.lineItems.length} item
            {invoice.lineItems.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {invoice.lineItems.map((item, i) => (
            <LineItemRow
              key={item.id}
              item={item}
              index={i}
              currency={invoice.currency}
              onUpdate={(field, value) =>
                onUpdateLineItem(item.id, field, value)
              }
              onRemove={() => onRemoveLineItem(item.id)}
              canRemove={invoice.lineItems.length > 1}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onAddLineItem}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary hover:bg-primary/5"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add line item
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel htmlFor="issue-date">Issue Date</FieldLabel>
          <input
            id="issue-date"
            name="issue-date"
            type="date"
            value={invoice.issueDate}
            onChange={(e) => onFieldChange('issueDate', e.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none scheme-dark"
          />
        </div>
        <div>
          <FieldLabel htmlFor="due-date">Due Date</FieldLabel>
          <input
            id="due-date"
            name="due-date"
            type="date"
            value={invoice.dueDate}
            onChange={(e) => onFieldChange('dueDate', e.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none scheme-dark"
          />
        </div>
      </div>

      <CollapsibleSection
        title="Discount & Tax"
        icon={Percent}
        defaultOpen={true}
      >
        <div className="flex flex-col gap-3">
          <div>
            <FieldLabel>Discount</FieldLabel>
            <div className="flex gap-2">
              <select
                value={invoice.discountType}
                onChange={(e) =>
                  onChangeDiscountType(e.target.value as DiscountType)
                }
                aria-label="Discount type"
                name="discount-type"
                autoComplete="off"
                className="rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="percentage">%</option>
                <option value="fixed">Fixed</option>
              </select>
              <input
                type="text"
                name="discount-value"
                value={
                  invoice.discountType === 'percentage'
                    ? invoice.discountValue === 0
                      ? ''
                      : String(invoice.discountValue)
                    : minorUnitsToInputString(
                        invoice.discountValue,
                        invoice.currency
                      )
                }
                onChange={(e) => onMoneyInput('discountValue', e.target.value)}
                placeholder={
                  invoice.discountType === 'percentage' ? '0' : '0.00'
                }
                aria-label="Discount value"
                autoComplete="off"
                className="flex-1 rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground text-right placeholder:text-text-muted transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
          <div>
            <FieldLabel htmlFor="tax-rate">Tax Rate (%)</FieldLabel>
            <input
              id="tax-rate"
              type="text"
              name="tax-rate"
              value={invoice.taxRate === 0 ? '' : String(invoice.taxRate)}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 0;
                onFieldChange('taxRate', Math.max(0, val));
              }}
              placeholder="0"
              aria-label="Tax rate percentage"
              autoComplete="off"
              className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground text-right placeholder:text-text-muted transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Notes" icon={StickyNote} defaultOpen={false}>
        <textarea
          name="notes"
          value={invoice.notes}
          onChange={(e) => onFieldChange('notes', e.target.value)}
          placeholder="Payment terms, thank you message, etc."
          rows={3}
          className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-text-muted transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none"
        />
      </CollapsibleSection>
    </div>
  );
}

type FieldLabelProps = {
  htmlFor?: string;
} & React.PropsWithChildren;

function FieldLabel({ htmlFor, children }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-medium text-text-secondary"
    >
      {children}
    </label>
  );
}

type TextInputProps = {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  spellCheck?: boolean;
  autoComplete?: string;
};

function TextInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  spellCheck,
  autoComplete,
}: TextInputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      spellCheck={spellCheck}
      autoComplete={autoComplete}
      className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-text-muted transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
    />
  );
}

type LineItemRowProps = {
  item: LineItem;
  index: number;
  currency: CurrencyCode;
  onUpdate: <K extends keyof LineItem>(field: K, value: LineItem[K]) => void;
  onRemove: () => void;
  canRemove: boolean;
};

function LineItemRow({
  item,
  index,
  currency,
  onUpdate,
  onRemove,
  canRemove,
}: LineItemRowProps) {
  return (
    <div className="group rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-3 transition-colors hover:border-[rgba(255,255,255,0.12)]">
      <div className="flex items-start gap-3">
        <span className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold text-text-muted bg-[rgba(255,255,255,0.05)]">
          {index + 1}
        </span>
        <div className="flex-1 flex flex-col gap-2">
          <input
            type="text"
            name={`item-${index}-description`}
            value={item.description}
            onChange={(e) => onUpdate('description', e.target.value)}
            placeholder="Item description"
            aria-label={`Item ${index + 1} description`}
            autoComplete="off"
            className="w-full rounded-md border-0 bg-transparent px-0 py-1 text-sm font-medium text-foreground placeholder:text-text-muted focus:ring-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          />
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                Qty
              </span>
              <input
                type="number"
                name={`item-${index}-quantity`}
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  onUpdate(
                    'quantity',
                    Math.max(1, parseInt(e.target.value) || 1)
                  )
                }
                aria-label={`Item ${index + 1} quantity`}
                autoComplete="off"
                className="w-14 rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground text-center transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">
                Price
              </span>
              <input
                type="text"
                name={`item-${index}-price`}
                value={minorUnitsToInputString(item.unitPriceCents, currency)}
                onChange={(e) =>
                  onUpdate(
                    'unitPriceCents',
                    toMinorUnits(e.target.value, currency)
                  )
                }
                placeholder="0.00"
                aria-label={`Item ${index + 1} unit price`}
                autoComplete="off"
                className="w-24 rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground text-right placeholder:text-text-muted transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground tabular-nums">
                {formatMoney(lineTotal(item, currency), currency)}
              </span>
              <button
                type="button"
                onClick={onRemove}
                disabled={!canRemove}
                className="flex h-6 w-6 items-center justify-center rounded text-text-muted transition-all lg:opacity-0 lg:group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive disabled:opacity-0 disabled:cursor-not-allowed"
                aria-label="Remove line item"
              >
                <Trash2 className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type CollapsibleSectionProps = {
  title: string;
  icon: React.ComponentType<{
    className?: string;
    'aria-hidden'?: boolean | 'true' | 'false';
  }>;
  defaultOpen?: boolean;
} & React.PropsWithChildren;

function CollapsibleSection({
  title,
  icon: Icon,
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  return (
    <details open={defaultOpen} className="group/details">
      <summary className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:text-foreground list-none [&::-webkit-details-marker]:hidden">
        <Icon className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
        <span>{title}</span>
        <ChevronDown
          className="ml-auto h-3.5 w-3.5 text-text-muted transition-transform group-open/details:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="mt-2 rounded-lg border border-border bg-card p-4 animate-fade-in-slide-down">
        {children}
      </div>
    </details>
  );
}
