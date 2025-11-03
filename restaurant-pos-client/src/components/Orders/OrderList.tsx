import React, { useEffect, useState } from 'react';
import { orderService } from '../../services/orderService';
import { Order } from '../../types';
import './OrderList.css';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getAll();
      setOrders(data);
    setError(null);
    } catch (err) {
      setError('Không thể tải đơn hàng.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await orderService.updateStatus(id, status);
      setOrders(orders.map(order => 
        order.id === id ? { ...order, status } : order
      ));
  } catch (err) {
      setError('Không thể cập nhật trạng thái.');
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Bạn có chắc muốn xóa đơn hàng này?')) {
      try {
   await orderService.delete(id);
        setOrders(orders.filter(o => o.id !== id));
      } catch (err) {
    setError('Không thể xóa đơn hàng.');
        console.error('Error deleting order:', err);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'warning';
    case 'Completed': return 'success';
      case 'Cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
case 'Pending': return 'Đang xử lý';
      case 'Completed': return 'Hoàn thành';
      case 'Cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="order-list-container">
      <div className="header">
        <h2>Quản lý Đơn hàng</h2>
        <button className="btn btn-primary">+ Tạo đơn hàng</button>
      </div>

      <div className="orders-table">
     <table>
        <thead>
     <tr>
     <th>Mã ĐH</th>
              <th>Bàn</th>
  <th>Khách hàng</th>
       <th>Ngày đặt</th>
  <th>Tổng tiền</th>
              <th>Trạng thái</th>
        <th>Thao tác</th>
            </tr>
    </thead>
          <tbody>
            {orders.map(order => (
 <tr key={order.id}>
                <td>#{order.id}</td>
        <td>{order.table?.tableNumber || 'N/A'}</td>
            <td>{order.customerName || 'Khách vãng lai'}</td>
            <td>{new Date(order.orderDate).toLocaleString('vi-VN')}</td>
       <td className="price">{order.totalAmount.toLocaleString('vi-VN')} đ</td>
       <td>
              <select
    className={`status-select ${getStatusColor(order.status)}`}
           value={order.status}
      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
        >
     <option value="Pending">Đang xử lý</option>
       <option value="Completed">Hoàn thành</option>
       <option value="Cancelled">Đã hủy</option>
 </select>
       </td>
            <td>
          <div className="action-buttons">
    <button className="btn btn-sm btn-info">Chi tiết</button>
      <button 
          className="btn btn-sm btn-delete"
             onClick={() => handleDelete(order.id)}
            >
           Xóa
                    </button>
             </div>
     </td>
    </tr>
     ))}
          </tbody>
      </table>
      </div>

      {orders.length === 0 && (
   <div className="empty-state">Không có đơn hàng nào</div>
      )}
    </div>
  );
};

export default OrderList;
