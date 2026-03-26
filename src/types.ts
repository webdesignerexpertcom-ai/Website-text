export interface ProductPrice {
  weight: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  teluguName?: string;
  description?: string;
  benefits?: string[];
  image: string;
  category: 'pickles' | 'powders' | 'snacks' | 'sweets';
  prices: ProductPrice[];
}

export interface CartItem extends Product {
  selectedWeight: string;
  selectedPrice: number;
  cartId: string; // Unique ID for each entry in cart
  quantity: number;
}

export type Category = 'pickles' | 'powders' | 'snacks' | 'sweets' | 'all';
