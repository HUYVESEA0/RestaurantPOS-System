export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  categoryId: number;
  category?: Category;
  imageUrl?: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  products?: Product[];
}

export interface Order {
  id: number;
  tableId?: number;
  table?: Table;
  orderDate: string;
  totalAmount: number;
  status: string;
  customerName?: string;
  notes?: string;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  order?: Order;
  productId: number;
  product?: Product;
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export interface Table {
  id: number;
  tableNumber: string;
  capacity: number;
  isAvailable: boolean;
  orders?: Order[];
}
