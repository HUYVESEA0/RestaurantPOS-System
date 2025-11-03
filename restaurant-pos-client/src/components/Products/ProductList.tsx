import React, { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { Product, Category } from '../../types';
import './ProductList.css';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

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
      setProducts(productsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      setError('Không thể tải dữ liệu. Vui lòng kiểm tra kết nối API.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    try {
      setLoading(true);
      const data = categoryId 
        ? await productService.getByCategory(categoryId)
        : await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError('Không thể tải sản phẩm.');
      console.error('Error filtering products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        await productService.delete(id);
  setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        setError('Không thể xóa sản phẩm.');
 console.error('Error deleting product:', err);
      }
 }
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list-container">
      <div className="header">
        <h2>Quản lý Sản phẩm</h2>
    <button className="btn btn-primary">+ Thêm sản phẩm</button>
   </div>

      <div className="filters">
        <button 
     className={`filter-btn ${selectedCategory === null ? 'active' : ''}`}
       onClick={() => handleCategoryFilter(null)}
        >
 Tất cả
    </button>
        {categories.map(category => (
      <button
            key={category.id}
            className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryFilter(category.id)}
       >
            {category.name}
          </button>
      ))}
      </div>

      <div className="product-grid">
  {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
         {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} />
   ) : (
<div className="no-image">No Image</div>
         )}
            </div>
            <div className="product-info">
         <h3>{product.name}</h3>
       <p className="description">{product.description}</p>
     <p className="price">{product.price.toLocaleString('vi-VN')} đ</p>
      <p className="category">{product.category?.name}</p>
              <div className="status">
            <span className={`badge ${product.isAvailable ? 'available' : 'unavailable'}`}>
      {product.isAvailable ? 'Còn hàng' : 'Hết hàng'}
        </span>
        </div>
         </div>
            <div className="product-actions">
      <button className="btn btn-edit">Sửa</button>
              <button 
     className="btn btn-delete"
onClick={() => handleDelete(product.id)}
      >
      Xóa
              </button>
     </div>
          </div>
    ))}
      </div>

      {products.length === 0 && (
        <div className="empty-state">Không có sản phẩm nào</div>
      )}
    </div>
  );
};

export default ProductList;
