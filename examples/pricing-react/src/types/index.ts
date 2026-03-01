export interface PricingTier {
  name: string;
  monthlyPrice: number;
  individual: boolean;
  description: string;
  featuresHeading: string;
  features: string[];
}
