export type CurrencyCode = 'USD' | 'EUR';

export interface CartItem {
  name: string;
  image: string;
  brand: string;
  price: number;
  quantity: number;
}

export interface ShippingOption {
  label: string;
  price: number;
}
