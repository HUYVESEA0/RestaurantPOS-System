import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tableService } from '../../services/tableService';
import { orderService } from '../../services/orderService';
import { Table } from '../../types';
import { useElapsedTime, getElapsedTimeColor } from '../../hooks/useElapsedTime';
import ReturnTableDialog from './ReturnTableDialog';
import './TableList.css';

const TableList: React.FC = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'occupied'>('all');
  const [floorFilter, setFloorFilter] = useState<string>('all');
  
  // ✅ Dialog state
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [returningTable, setReturningTable] = useState<{ id: number; name: string } | null>(null);
  const [pendingOrdersInfo, setPendingOrdersInfo] = useState<{ count: number; total: number }>({ count: 0, total: 0 });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      setLoading(true);
      const [tablesData, allOrders] = await Promise.all([
        tableService.getAll(),
        orderService.getAll(),
      ]);

      // ✅ DEBUG: Check order date format
      if (allOrders.length > 0) {
 console.log('🔍 Sample orderDate:', allOrders[0].orderDate);
        console.log('🔍 Type:', typeof allOrders[0].orderDate);
      }

      // Calculate occupiedAt for each table
      const tablesWithOccupiedTime = tablesData.map(table => {
        if (!table.isAvailable) {
          const pendingOrders = allOrders
         .filter(o => o.tableId === table.id && o.status === 'Pending')
.sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime());

  if (pendingOrders.length > 0) {
      const occupiedAt = pendingOrders[0].orderDate;
    console.log(`🔍 Table ${table.tableNumber} occupied at:`, occupiedAt);
            
      return {
              ...table,
      occupiedAt,
            };
          }
}
        return table;
      });

      setTables(tablesWithOccupiedTime);
      setError(null);
    } catch (err) {
      setError('Không thể tải danh sách bàn.');
      console.error('Error fetching tables:', err);
    } finally {
      setLoading(false);
}
  };

  // ✅ Updated: Handle returning table with dialog
  const handleReturnTable = async (tableId: number) => {
    try {
   // 1. Find pending orders for this table
      const orders = await orderService.getByTable(tableId);
      const pendingOrders = orders.filter(o => o.status === 'Pending');

      const tableData = tables.find(t => t.id === tableId);
      
      if (pendingOrders.length > 0) {
  // 2. Show dialog instead of confirm
        const totalAmount = pendingOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        setReturningTable({ id: tableId, name: tableData?.tableNumber || `Bàn #${tableId}` });
        setPendingOrdersInfo({ count: pendingOrders.length, total: totalAmount });
        setShowReturnDialog(true);
      } else {
        // No pending orders, just return table
        await tableService.updateAvailability(tableId, true);
        setTables(tables.map(table => 
  table.id === tableId ? { ...table, isAvailable: true } : table
        ));
      }
    } catch (err) {
      setError('Không thể trả bàn.');
 console.error('Error returning table:', err);
    }
  };

  // ✅ NEW: Handle dialog confirm
  const handleReturnConfirm = async (shouldComplete: boolean) => {
    if (!returningTable) return;

    try {
  // 1. Get pending orders
      const orders = await orderService.getByTable(returningTable.id);
      const pendingOrders = orders.filter(o => o.status === 'Pending');

      // 2. Complete orders if user chose to
      if (shouldComplete) {
     for (const order of pendingOrders) {
          await orderService.updateStatus(order.id, 'Completed');
        }
      }

      // 3. Mark table as available
   await tableService.updateAvailability(returningTable.id, true);
 
      // 4. Update local state (clear occupiedAt)
      setTables(tables.map(table => 
        table.id === returningTable.id 
     ? { ...table, isAvailable: true, occupiedAt: undefined } // ✅ Clear timer
          : table
      ));

      // 5. Close dialog
      setShowReturnDialog(false);
      setReturningTable(null);

 // 6. Show success message
      if (shouldComplete) {
        alert(`✅ Đã hoàn thành ${pendingOrders.length} đơn hàng và trả bàn!\n💰 Doanh thu: +${pendingOrdersInfo.total.toLocaleString('vi-VN')} đ`);
      } else {
        alert(`✅ Đã trả bàn. Đơn hàng vẫn ở trạng thái "Đang xử lý".`);
      }
} catch (err) {
      setError('Không thể trả bàn.');
    console.error('Error returning table:', err);
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

  // ✅ Get unique floors
  const floors = ['all', ...Array.from(new Set(tables.map(t => t.floor)))];

  // ✅ Filter by both status and floor
  const filteredTables = tables.filter(table => {
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'available' && table.isAvailable) ||
      (statusFilter === 'occupied' && !table.isAvailable);
    
    const matchesFloor = floorFilter === 'all' || table.floor === floorFilter;
    
    return matchesStatus && matchesFloor;
  });

  // ✅ Group tables by floor for display
const tablesByFloor = filteredTables.reduce((acc, table) => {
    if (!acc[table.floor]) {
      acc[table.floor] = [];
    }
    acc[table.floor].push(table);
    return acc;
  }, {} as Record<string, Table[]>);

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="table-list-container">
      {/* ✅ Return Table Dialog */}
      {showReturnDialog && returningTable && (
<ReturnTableDialog
          tableName={returningTable.name}
          orderCount={pendingOrdersInfo.count}
    totalAmount={pendingOrdersInfo.total}
        onConfirm={handleReturnConfirm}
          onCancel={() => {
   setShowReturnDialog(false);
  setReturningTable(null);
          }}
        />
      )}

      <div className="header">
 <h2>Quản lý Bàn</h2>
        <button className="btn btn-primary" onClick={() => navigate('/tables/new')}>
          + Thêm bàn
        </button>
      </div>

      {/* ✅ Status Filters */}
      <div className="filters">
     <div className="filter-group">
          <label>Trạng thái:</label>
          <button 
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
Tất cả ({tables.length})
          </button>
          <button 
         className={`filter-btn ${statusFilter === 'available' ? 'active' : ''}`}
  onClick={() => setStatusFilter('available')}
      >
       ✓ Trống ({tables.filter(t => t.isAvailable).length})
          </button>
          <button 
         className={`filter-btn ${statusFilter === 'occupied' ? 'active' : ''}`}
          onClick={() => setStatusFilter('occupied')}
          >
            ✗ Đang dùng ({tables.filter(t => !t.isAvailable).length})
     </button>
        </div>

        {/* ✅ Floor Filters */}
        <div className="filter-group">
 <label>Tầng:</label>
 {floors.map(floor => (
   <button
              key={floor}
    className={`filter-btn ${floorFilter === floor ? 'active' : ''}`}
              onClick={() => setFloorFilter(floor)}
  >
     {floor === 'all' 
     ? `Tất cả tầng` 
       : `${floor} (${tables.filter(t => t.floor === floor).length})`
  }
      </button>
          ))}
    </div>
      </div>

    {/* ✅ Display tables grouped by floor */}
      {floorFilter === 'all' ? (
        // Show all floors separately
        Object.entries(tablesByFloor).map(([floor, floorTables]) => (
     <div key={floor} className="floor-section">
    <h3 className="floor-title">
       📍 {floor} ({floorTables.length} bàn)
  </h3>
    <div className="table-grid">
     {floorTables.map(table => (
        <TableCard 
          key={table.id}
 table={table}
          onReturnTable={handleReturnTable}
     onDelete={handleDelete}
      onEdit={() => navigate(`/tables/edit/${table.id}`)}
        />
        ))}
     </div>
          </div>
        ))
      ) : (
        // Show selected floor only
      <div className="table-grid">
       {filteredTables.map(table => (
       <TableCard 
              key={table.id}
     table={table}
     onReturnTable={handleReturnTable}
  onDelete={handleDelete}
              onEdit={() => navigate(`/tables/edit/${table.id}`)}
       />
          ))}
        </div>
  )}

      {filteredTables.length === 0 && (
        <div className="empty-state">Không có bàn nào</div>
      )}
</div>
  );
};

// ✅ Updated TableCard component
interface TableCardProps {
  table: Table;
  onReturnTable: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: () => void;
}

// ✅ Updated TableCard component with timer
const TableCard: React.FC<TableCardProps> = ({ 
  table, 
  onReturnTable,
  onDelete, 
  onEdit 
}) => {
  const navigate = useNavigate();
  const elapsedTime = useElapsedTime(table.occupiedAt);
  const timeColorClass = getElapsedTimeColor(table.occupiedAt);

  // ✅ NEW: Handle view orders for this table
  const handleViewOrders = async () => {
    try {
      // Get orders for this table
      const orders = await orderService.getByTable(table.id);
      const pendingOrders = orders.filter(o => o.status === 'Pending');

 if (pendingOrders.length > 0) {
   // Navigate to first pending order detail
     navigate(`/orders/${pendingOrders[0].id}`, { state: { from: 'tables' } });
   } else if (orders.length > 0) {
        // If no pending, show most recent order
   const recentOrder = orders.sort((a, b) => 
     new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      )[0];
     navigate(`/orders/${recentOrder.id}`, { state: { from: 'tables' } });
} else {
  alert('Bàn này chưa có đơn hàng nào');
    }
    } catch (err) {
  console.error('Error fetching table orders:', err);
      alert('Không thể tải đơn hàng');
    }
  };

  return (
    <div className={`table-card ${table.isAvailable ? 'available' : 'occupied'}`}>
      <div className="table-header">
        <div className="table-number">{table.tableNumber}</div>
        <div className={`status-badge ${table.isAvailable ? 'available' : 'occupied'}`}>
{table.isAvailable ? '✓ Trống' : '✗ Đang dùng'}
        </div>
      </div>

      {/* ✅ Show timer for occupied tables */}
   {!table.isAvailable && elapsedTime && (
        <div className={`occupied-timer ${timeColorClass}`}>
          <span className="timer-icon">🕐</span>
 <span className="timer-text">{elapsedTime}</span>
        </div>
 )}

    <div className="table-info">
        <div className="info-item">
  <span className="icon">📍</span>
          <span>{table.floor}</span>
        </div>
    <div className="info-item">
 <span className="icon">👥</span>
        <span>{table.capacity} người</span>
        </div>
      </div>
      <div className="table-actions">
 {table.isAvailable ? (
    <>
 <button 
   className="btn btn-order"
  onClick={() => navigate('/orders/new', { state: { tableId: table.id } })}
    >
 🍽️ Đặt món
       </button>
 <button className="btn btn-edit" onClick={onEdit}>Sửa</button>
    </>
  ) : (
      <>
  <button 
    className="btn btn-view-order"
       onClick={handleViewOrders}
 >
     📋 Xem đơn
 </button>
          </>
        )}
    <button 
          className="btn btn-delete"
   onClick={() => onDelete(table.id)}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default TableList;
