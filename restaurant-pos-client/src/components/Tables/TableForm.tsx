import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { tableService } from '../../services/tableService';
import { Table } from '../../types';
import './TableForm.css';

const TableForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    tableNumber: '',
    capacity: '',
    floor: 'Tầng 1',
    isAvailable: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingFloors, setExistingFloors] = useState<string[]>([]); // ✅ Dynamic floors
  const [showCustomFloor, setShowCustomFloor] = useState(false); // ✅ Custom floor input
  const [customFloorName, setCustomFloorName] = useState('');

  // ✅ Suggested floor names
  const suggestedFloors = [
    'Tầng 1', 'Tầng 2', 'Tầng 3', 'Tầng 4', 'Tầng 5',
    'Tầng trệt', 'Tầng lửng', 'Sân thượng', 
    'Khu VIP', 'Khu ngoài trời', 'Khu gia đình'
  ];

  useEffect(() => {
    fetchExistingFloors();
    if (isEditMode) {
      fetchTable();
    }
  }, [id]);

  // ✅ Fetch existing floors from current tables
  const fetchExistingFloors = async () => {
    try {
      const tables = await tableService.getAll();
      const floors = Array.from(new Set(tables.map(t => t.floor))).sort();
      setExistingFloors(floors);
    } catch (err) {
      console.error('Error fetching floors:', err);
    }
  };

  const fetchTable = async () => {
    try {
      const table = await tableService.getById(Number(id));
      setFormData({
        tableNumber: table.tableNumber,
        capacity: table.capacity.toString(),
        floor: table.floor,
        isAvailable: table.isAvailable,
      });
    } catch (err) {
      setError('Không thể tải thông tin bàn');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const capacityValue = Number(formData.capacity);
    if (isNaN(capacityValue) || capacityValue < 1 || capacityValue > 20) {
      setError('Sức chứa phải từ 1-20 người');
      setLoading(false);
      return;
    }

    // ✅ Use custom floor name if provided
    const finalFloor = showCustomFloor && customFloorName.trim() 
    ? customFloorName.trim() 
      : formData.floor;

    if (!finalFloor) {
      setError('Vui lòng chọn hoặc nhập tên tầng');
      setLoading(false);
      return;
    }

    try {
      const tableData: Partial<Table> = {
        tableNumber: formData.tableNumber,
        capacity: capacityValue,
 floor: finalFloor,
        isAvailable: formData.isAvailable,
        id: isEditMode ? Number(id) : 0,
      };

 if (isEditMode) {
   await tableService.update(Number(id), tableData as Table);
      } else {
        await tableService.create(tableData as Omit<Table, 'id'>);
      }

      navigate('/tables');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
  ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (name === 'capacity') {
      if (value === '' || /^\d+$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
  setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Merge existing and suggested floors, remove duplicates
  const allFloorOptions = Array.from(new Set([
    ...existingFloors,
    ...suggestedFloors.filter(sf => !existingFloors.includes(sf))
  ]));

  return (
    <div className="table-form-container">
      <div className="form-header">
     <h2>{isEditMode ? 'Cập nhật bàn' : 'Thêm bàn mới'}</h2>
  <button onClick={() => navigate('/tables')} className="btn-back">
          ← Quay lại
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="table-form">
      <div className="form-row">
          <div className="form-group">
            <label htmlFor="tableNumber">Số bàn *</label>
            <input
        type="text"
          id="tableNumber"
     name="tableNumber"
      value={formData.tableNumber}
  onChange={handleChange}
  required
     placeholder="VD: B01, B02..."
       maxLength={20}
     />
          </div>

          <div className="form-group">
        <label htmlFor="capacity">Số người *</label>
            <input
      type="text"
              id="capacity"
          name="capacity"
              value={formData.capacity}
     onChange={handleChange}
        required
              placeholder="Số người"
      inputMode="numeric"
          />
 {formData.capacity && (
   <small className="capacity-preview">
      👥 {formData.capacity} người
              </small>
            )}
          </div>
        </div>

   {/* ✅ Enhanced Floor Selection */}
      <div className="form-group">
          <label htmlFor="floor">Tầng / Khu vực *</label>
      
 {!showCustomFloor ? (
<>
   <select
   id="floor"
      name="floor"
       value={formData.floor}
      onChange={handleChange}
      required
    >
     {allFloorOptions.map(floor => (
<option key={floor} value={floor}>
   {floor}
  {existingFloors.includes(floor) ? ' (đang sử dụng)' : ''}
</option>
        ))}
 </select>
        <button
                type="button"
            className="btn-add-floor"
        onClick={() => setShowCustomFloor(true)}
    >
         ➕ Thêm tầng mới
           </button>
     </>
          ) : (
   <>
  <input
                type="text"
      value={customFloorName}
        onChange={(e) => setCustomFloorName(e.target.value)}
    placeholder="Nhập tên tầng mới (VD: Tầng 3, Khu VIP...)"
      maxLength={50}
                autoFocus
              />
           <div className="custom-floor-actions">
     <button
  type="button"
    className="btn-cancel-custom"
        onClick={() => {
               setShowCustomFloor(false);
  setCustomFloorName('');
       }}
         >
        ✗ Hủy
        </button>
                <small className="custom-floor-hint">
          💡 Tầng mới sẽ tự động xuất hiện trong danh sách
          </small>
              </div>
        </>
          )}
        </div>

        {/* ✅ Show existing floors count */}
        {existingFloors.length > 0 && !showCustomFloor && (
  <div className="floor-info">
   <small>
      📊 Hiện có <strong>{existingFloors.length} tầng</strong>: {existingFloors.join(', ')}
       </small>
          </div>
        )}

        <div className="form-group checkbox-group">
      <label>
       <input
type="checkbox"
              name="isAvailable"
          checked={formData.isAvailable}
 onChange={handleChange}
   />
     <span>Bàn đang trống</span>
          </label>
     </div>

  <div className="form-actions">
          <button type="button" onClick={() => navigate('/tables')} className="btn-cancel">
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

export default TableForm;
