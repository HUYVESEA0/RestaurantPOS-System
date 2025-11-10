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
  // Optional extensions for variants and stock
  variants?: ProductVariant[];
  modifiers?: ProductModifier[];
  stockQty?: number; // current stock (optional)
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
  
  // ✅ NEW: Order type and grouping
  orderType?: 'DineIn' | 'Takeaway' | 'Delivery';
  parentOrderId?: number | null;
  orderGroupId?: number | null;
  
  paymentMethod?: 'CASH' | 'QR' | 'CARD';
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
  // Chosen variant/modifiers (optional)
  variantId?: number;
  modifierItemIds?: number[];
}

export interface Table {
  id: number;
  tableNumber: string;
  capacity: number;
  isAvailable: boolean;
  floor: string; // ✅ NEW: Floor/Area
  orders?: Order[];
  
  // ✅ NEW: Merging support
  isMerged?: boolean;
  mergedGroupId?: number | null;
  mergedTableNumbers?: string | null;
  
  // Optional features
  occupiedAt?: string; // ✅ Timestamp when table became occupied
}

// Optional: product variant and modifiers structures (frontend-only for now)
export interface ProductVariant {
  id: number;
  name: string; // e.g., "Suất nhỏ", "Suất đầy", "Combo 2 người"
  priceDelta?: number; // price adjustment from base
}

export interface ProductModifier {
  id: number;
  name: string; // e.g., "Đậu thêm", "Bún thêm", "Mắm tôm nhiều"
  items: ModifierItem[];
  maxChoice?: number; // optional selection limit
}

export interface ModifierItem {
  id: number;
  name: string;
  priceDelta?: number;
}
