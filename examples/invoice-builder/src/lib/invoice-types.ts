export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPriceCents: number;
}

export type DiscountType = 'percentage' | 'fixed';

export interface InvoiceData {
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessLogo: string | null;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  currency: CurrencyCode;
  lineItems: LineItem[];
  discountType: DiscountType;
  discountValue: number;
  taxRate: number;
  notes: string;
}
