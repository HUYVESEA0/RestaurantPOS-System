import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { Product, Category } from '../../types';
import './AddItemDialog.css';

interface AddItemDialogProps {
  onAdd: (productId: number, quantity: number, notes: string) => void;
  onCancel: () => void;
}

const AddItemDialog: React.FC<AddItemDialogProps> = ({ onAdd, onCancel }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
    categoryService.getAll(),
      ]);
 setProducts(productsData.filter(p => p.isAvailable));
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
   setLoading(false);
    }
  };

  const handleCategoryFilter = async (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    try {
      const data = categoryId
        ? await productService.getByCategory(categoryId)
     : await productService.getAll();
      setProducts(data.filter(p => p.isAvailable));
    } catch (err) {
 console.error('Error filtering products:', err);
    }
  };

  const handleSubmit = () => {
    if (!selectedProduct) {
      alert('Vui lòng chọn món');
      return;
    }
    if (quantity < 1) {
      alert('Số lượng phải >= 1');
      return;
    }
    onAdd(selectedProduct.id, quantity, notes);
  };

  if (loading) {
    return (
      <div className="dialog-overlay">
     <div className="dialog-container">
          <div className="loading">Đang tải...</div>
</div>
      </div>
 );
  }

  return (
    <div className="dialog-overlay">
      <div className="add-item-dialog">
        <div className="dialog-header">
          <h3>➕ Thêm món</h3>
   <button className="btn-close" onClick={onCancel}>×</button>
        </div>

   <div className="dialog-content">
     {/* Category Filter */}
          <div className="category-filters">
        <button
   className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => handleCategoryFilter(null)}
        >
   Tất cả
 </button>
            {categories.map(category => (
         <button
                key={category.id}
          className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
        onClick={() => handleCategoryFilter(category.id)}
     >
       {category.name}
      </button>
       ))}
          </div>

        {/* Product Grid */}
    <div className="product-grid">
   {products.map(product => (
              <div
           key={product.id}
      className={`product-item ${selectedProduct?.id === product.id ? 'selected' : ''}`}
          onClick={() => setSelectedProduct(product)}
              >
    <div className="product-name">{product.name}</div>
             <div className="product-price">{product.price.toLocaleString('vi-VN')} đ</div>
       {selectedProduct?.id === product.id && (
              <div className="selected-badge">✓</div>
     )}
           </div>
            ))}
          </div>

   {products.length === 0 && (
            <div className="empty-message">Không có món nào</div>
          )}

          {/* Selected Product Details */}
      {selectedProduct && (
            <div className="selected-product-panel">
      <h4>Món đã chọn:</h4>
          <div className="selected-details">
     <div className="detail-row">
        <span className="label">Tên món:</span>
   <span className="value">{selectedProduct.name}</span>
        </div>
         <div className="detail-row">
       <span className="label">Đơn giá:</span>
           <span className="value price">{selectedProduct.price.toLocaleString('vi-VN')} đ</span>
        </div>
     
    {/* Quantity Input */}
 <div className="detail-row">
       <span className="label">Số lượng:</span>
     <div className="quantity-controls">
          <button 
           className="qty-btn"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
     >
       −
   </button>
             <input
             type="number"
         min="1"
      value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          className="qty-input"
        />
     <button 
      className="qty-btn"
           onClick={() => setQuantity(quantity + 1)}
 >
     +
       </button>
   </div>
       </div>

         {/* Notes */}
       <div className="detail-row">
         <span className="label">Ghi chú:</span>
       <textarea
 value={notes}
           onChange={(e) => setNotes(e.target.value)}
            placeholder="Ví dụ: Ít cay, nhiều rau..."
      className="notes-input"
            rows={2}
         />
    </div>

    {/* Total */}
    <div className="detail-row total-row">
           <span className="label">Thành tiền:</span>
<span className="value total">{(selectedProduct.price * quantity).toLocaleString('vi-VN')} đ</span>
          </div>
              </div>
            </div>
          )}
        </div>

        <div className="dialog-actions">
          <button className="btn btn-cancel" onClick={onCancel}>
         Hủy
          </button>
          <button 
            className="btn btn-primary" 
  onClick={handleSubmit}
            disabled={!selectedProduct}
          >
            ✓ Thêm món ({quantity})
      </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemDialog;
