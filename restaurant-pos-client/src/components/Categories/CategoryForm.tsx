import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryService } from '../../services/categoryService';
import { Category } from '../../types';
import './CategoryForm.css';

const CategoryForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
 name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditMode) {
      fetchCategory();
    }
  }, [id]);

  const fetchCategory = async () => {
    try {
      const category = await categoryService.getById(Number(id));
      setFormData({
        name: category.name,
     description: category.description || '',
      });
    } catch (err) {
      setError('Không thể tải thông tin danh mục');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (formData.name.trim().length < 2) {
      setError('Tên danh mục phải có ít nhất 2 ký tự');
      setLoading(false);
      return;
    }

    if (formData.name.length > 50) {
      setError('Tên danh mục không được quá 50 ký tự');
      setLoading(false);
      return;
    }

    try {
      const categoryData: Partial<Category> = {
  name: formData.name.trim(),
      description: formData.description.trim() || undefined,
        id: isEditMode ? Number(id) : 0,
      };

      if (isEditMode) {
     await categoryService.update(Number(id), categoryData as Category);
      } else {
   await categoryService.create(categoryData as Omit<Category, 'id'>);
      }

      navigate('/categories');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi');
    } finally {
    setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="category-form-container">
      <div className="form-header">
        <h2>{isEditMode ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}</h2>
        <button onClick={() => navigate('/categories')} className="btn-back">
  ← Quay lại
    </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="category-form">
      <div className="form-group">
 <label htmlFor="name">Tên danh mục *</label>
      <input
        type="text"
        id="name"
            name="name"
            value={formData.name}
         onChange={handleChange}
    required
  maxLength={50}
        placeholder="Nhập tên danh mục (VD: Đồ ăn, Đồ uống...)"
     autoFocus
    />
      <small className="char-count">
     {formData.name.length}/50 ký tự
          </small>
        </div>

        <div className="form-group">
      <label htmlFor="description">Mô tả</label>
   <textarea
         id="description"
     name="description"
            value={formData.description}
            onChange={handleChange}
   rows={4}
         maxLength={200}
     placeholder="Nhập mô tả cho danh mục (tùy chọn)"
 />
          <small className="char-count">
   {formData.description.length}/200 ký tự
     </small>
        </div>

        <div className="form-preview">
          <h4>👁️ Xem trước</h4>
          <div className="preview-card">
      <div className="preview-icon">📁</div>
   <div className="preview-info">
  <h3>{formData.name || 'Tên danh mục'}</h3>
 <p>{formData.description || 'Chưa có mô tả'}</p>
    </div>
     </div>
        </div>

   <div className="form-actions">
          <button type="button" onClick={() => navigate('/categories')} className="btn-cancel">
          Hủy
          </button>
     <button type="submit" disabled={loading} className="btn-submit">
    {loading ? 'Đang xử lý...' : (isEditMode ? 'Cập nhật' : 'Thêm mới')}
  </button>
        </div>
      </form>
    </div>
);
};

export default CategoryForm;
