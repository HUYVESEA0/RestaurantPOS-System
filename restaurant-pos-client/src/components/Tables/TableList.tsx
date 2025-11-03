import React, { useEffect, useState } from 'react';
import { tableService } from '../../services/tableService';
import { Table } from '../../types';
import './TableList.css';

const TableList: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'available' | 'occupied'>('all');

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      setLoading(true);
      const data = await tableService.getAll();
      setTables(data);
      setError(null);
    } catch (err) {
  setError('Không thể tải danh sách bàn.');
      console.error('Error fetching tables:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (id: number, isAvailable: boolean) => {
    try {
      await tableService.updateAvailability(id, !isAvailable);
      setTables(tables.map(table => 
        table.id === id ? { ...table, isAvailable: !isAvailable } : table
      ));
    } catch (err) {
      setError('Không thể cập nhật trạng thái bàn.');
      console.error('Error updating table availability:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa bàn này?')) {
      try {
      await tableService.delete(id);
        setTables(tables.filter(t => t.id !== id));
      } catch (err) {
      setError('Không thể xóa bàn.');
        console.error('Error deleting table:', err);
      }
    }
  };

  const filteredTables = tables.filter(table => {
    if (filter === 'available') return table.isAvailable;
    if (filter === 'occupied') return !table.isAvailable;
    return true;
  });

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="table-list-container">
      <div className="header">
        <h2>Quản lý Bàn</h2>
      <button className="btn btn-primary">+ Thêm bàn</button>
      </div>

      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
 onClick={() => setFilter('all')}
        >
     Tất cả ({tables.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
          onClick={() => setFilter('available')}
        >
          Trống ({tables.filter(t => t.isAvailable).length})
</button>
        <button 
          className={`filter-btn ${filter === 'occupied' ? 'active' : ''}`}
      onClick={() => setFilter('occupied')}
        >
          Đang sử dụng ({tables.filter(t => !t.isAvailable).length})
      </button>
   </div>

      <div className="table-grid">
    {filteredTables.map(table => (
       <div key={table.id} className={`table-card ${table.isAvailable ? 'available' : 'occupied'}`}>
      <div className="table-header">
        <div className="table-number">{table.tableNumber}</div>
    <div className={`status-badge ${table.isAvailable ? 'available' : 'occupied'}`}>
         {table.isAvailable ? '✓ Trống' : '✗ Đang dùng'}
           </div>
         </div>
    <div className="table-info">
              <div className="info-item">
          <span className="icon">👥</span>
     <span>{table.capacity} người</span>
  </div>
          </div>
       <div className="table-actions">
       <button 
   className={`btn btn-toggle ${table.isAvailable ? 'btn-occupy' : 'btn-free'}`}
                onClick={() => handleToggleAvailability(table.id, table.isAvailable)}
        >
       {table.isAvailable ? 'Đặt bàn' : 'Trả bàn'}
    </button>
              <button className="btn btn-edit">Sửa</button>
   <button 
           className="btn btn-delete"
      onClick={() => handleDelete(table.id)}
          >
      Xóa
  </button>
          </div>
          </div>
   ))}
      </div>

      {filteredTables.length === 0 && (
     <div className="empty-state">Không có bàn nào</div>
      )}
    </div>
  );
};

export default TableList;
