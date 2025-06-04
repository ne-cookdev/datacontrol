export interface Product {
  all_quantity: number;
  category: Category;
  description: string | null;
  height: number;
  id: number;
  image_ref: string | null;
  length: number;
  name: string;
  price: number;
  weight: number;
  width: number;
}

export interface ShortProduct {
  id: number;
  name: string;
  description: string;
  image_ref: string | null;
  all_quantity: number;
}

export interface CreateProductArgs {
  name: string;
  price: number;
  weight: number;
  width: number;
  height: number;
  length: number;
  category_id: number;
  description?: string;
  image_ref?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Order {
  number: number;
  order_details: OrderDetail[];
  user: User;
  order_date: string;
  status: number;
  address: string;
}

export interface OrderDetail {
  product: ShortProduct;
  quantity: number;
  price_at_order: number;
}

export interface User {
  id: number;
  email: string;
}

export interface CreateOrderArgs {
  order_details: {
    product_id: number;
    quantity: number;
  }[];
  address: string;
}

export interface Carrier {
  id: number;
  name: string;
}

export interface Shipment {
  tracking_number: number;
  order: Order;
  carrier: Carrier;
  status: number;
}

export interface CreateShipmentArgs {
  order_id: number;
  carrier_id: number;
}

export interface Stock {
  id: number;
  warehouse: Warehouse;
  product: Product;
  quantity: number;
}

export interface ShortStock {
  product: Product;
  quantity: number;
}

export interface CreateStockArgs {
  warehouse_id: number;
  product_id: number;
  quantity: number;
}

export interface Warehouse {
  id: number;
  stocks: ShortStock[];
  name: string;
  location: string;
}

export interface CreateWarehouseArgs {
  name: string;
  location: string;
}
