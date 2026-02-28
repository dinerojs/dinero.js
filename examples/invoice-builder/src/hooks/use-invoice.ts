import { useState, useCallback } from 'react';
import type {
  InvoiceData,
  LineItem,
  CurrencyCode,
  DiscountType,
} from '@/lib/invoice-types';

export function useInvoice() {
  const [invoice, setInvoice] = useState<InvoiceData>(createInitialInvoice);

  const updateField = useCallback(
    <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => {
      setInvoice((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const addLineItem = useCallback(() => {
    setInvoice((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, createEmptyLineItem()],
    }));
  }, []);

  const removeLineItem = useCallback((id: string) => {
    setInvoice((prev) => ({
      ...prev,
      lineItems:
        prev.lineItems.length > 1
          ? prev.lineItems.filter((item) => item.id !== id)
          : prev.lineItems,
    }));
  }, []);

  const updateLineItem = useCallback(
    <K extends keyof LineItem>(id: string, field: K, value: LineItem[K]) => {
      setInvoice((prev) => ({
        ...prev,
        lineItems: prev.lineItems.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      }));
    },
    []
  );

  const setCurrency = useCallback((currency: CurrencyCode) => {
    setInvoice((prev) => ({ ...prev, currency }));
  }, []);

  const setDiscountType = useCallback((discountType: DiscountType) => {
    setInvoice((prev) => ({ ...prev, discountType, discountValue: 0 }));
  }, []);

  const setBusinessLogo = useCallback((logo: string | null) => {
    setInvoice((prev) => ({ ...prev, businessLogo: logo }));
  }, []);

  return {
    invoice,
    updateField,
    addLineItem,
    removeLineItem,
    updateLineItem,
    setCurrency,
    setDiscountType,
    setBusinessLogo,
  };
}

function generateInvoiceNumber(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const sequence = String(Math.floor(Math.random() * 9000) + 1000);

  return `INV-${y}${m}-${sequence}`;
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}

function dueDateISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);

  return d.toISOString().split('T')[0];
}

function createEmptyLineItem(): LineItem {
  return {
    id: crypto.randomUUID(),
    description: '',
    quantity: 1,
    unitPriceCents: 0,
  };
}

function createInitialInvoice(): InvoiceData {
  return {
    businessName: 'Acme Corporation',
    businessAddress: '100 Market St, San Francisco, CA 94105',
    businessEmail: 'billing@acme.corp',
    businessLogo: null,
    clientName: 'Sarah Chen',
    clientAddress: '42 Innovation Drive, Austin, TX 73301',
    clientEmail: 'sarah@designstudio.io',
    invoiceNumber: generateInvoiceNumber(),
    issueDate: todayISO(),
    dueDate: dueDateISO(),
    currency: 'USD',
    lineItems: [
      {
        id: crypto.randomUUID(),
        description: 'Website Redesign',
        quantity: 1,
        unitPriceCents: 480000,
      },
      {
        id: crypto.randomUUID(),
        description: 'Logo & Brand Identity',
        quantity: 1,
        unitPriceCents: 240000,
      },
      {
        id: crypto.randomUUID(),
        description: 'SEO Optimization',
        quantity: 3,
        unitPriceCents: 45000,
      },
    ],
    discountType: 'percentage',
    discountValue: 5,
    taxRate: 8.25,
    notes:
      'Payment due within 30 days. Please include the invoice number with your payment.',
  };
}
