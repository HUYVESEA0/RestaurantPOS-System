import React, { useEffect, useState } from 'react';
import { categoryService } from '../../services/categoryService';
import { Category } from '../../types';
import './CategoryList.css';

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
  const data = await categoryService.getAll();
      setCategories(data);
      setError(null);
    } catch (err) {
   setError('Không thể tải danh mục.');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa danh mục này?')) {
      try {
        await categoryService.delete(id);
    setCategories(categories.filter(c => c.id !== id));
      } catch (err) {
     setError('Không thể xóa danh mục.');
   console.error('Error deleting category:', err);
      }
 }
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-list-container">
      <div className="header">
        <h2>Quản lý Danh mục</h2>
      <button className="btn btn-primary">+ Thêm danh mục</button>
      </div>

<div className="category-grid">
   {categories.map(category => (
          <div key={category.id} className="category-card">
<div className="category-icon">
              📁
</div>
   <div className="category-info">
        <h3>{category.name}</h3>
       <p>{category.description}</p>
    </div>
            <div className="category-actions">
  <button className="btn btn-edit">Sửa</button>
    <button 
    className="btn btn-delete"
            onClick={() => handleDelete(category.id)}
>
       Xóa
              </button>
        </div>
 </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="empty-state">Không có danh mục nào</div>
      )}
  </div>
  );
};

export default CategoryList;
