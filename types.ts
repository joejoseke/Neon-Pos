
import React from 'react';

export type Category = 'Beer' | 'Wine' | 'Spirits' | 'Soft Drinks' | 'Misc';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  stock: number;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactElement;
}

export interface CartItem extends Product {
  quantity: number;
}
