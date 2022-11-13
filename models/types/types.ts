export interface Notification {
  type: "succes" | "error" | "info" | "warrning";
  title: string;
  desc: string;
  index?: string;
}

export interface Product {
  _id: string;
  name: string;
  category: string;
  type: string;
  subtype: string;
  packageSize: number;
  quantityType: string;
  price: number;
  origin: string;
}

export interface Ingredient {
  type: string;
  product: Product[];
  inventory?: Item[];
  quantity: number;
  optional: boolean;
}

interface Step {
  title: string;
  desc: string;
}

export interface Recipe {
  _id: string;
  name: string;
  category: string[];
  ingredients: Ingredient[];
  steps: Step[];
  description: string;
  prepareTime: number;
  portionSize: number;
  lastMade: Date;
}

export interface Item {
  product: Product;
  quantity: number;
  quantityPerUser?: [];
  price: number;
  oldPrice?: number;
  changed?: boolean;
  inStock?: number;
}

export interface Category {
  name: string;
  items: Item[];
}
