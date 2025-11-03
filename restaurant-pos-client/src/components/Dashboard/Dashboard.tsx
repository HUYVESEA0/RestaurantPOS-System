import React, { useEffect, useState } from 'react';
import { productService } from '../../services/productService';
import { orderService } from '../../services/orderService';
import { categoryService } from '../../services/categoryService';
import { tableService } from '../../services/tableService';
import './Dashboard.css';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCategories: number;
  availableTables: number;
  todayRevenue: number;
  pendingOrders: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalCategories: 0,
 availableTables: 0,
    todayRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
try {
      setLoading(true);
      const [products, orders, categories, tables] = await Promise.all([
        productService.getAll(),
        orderService.getAll(),
    categoryService.getAll(),
        tableService.getAll(),
      ]);

      // Calculate today's revenue
const today = new Date();
      today.setHours(0, 0, 0, 0);
      
   const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate >= today && order.status === 'Completed';
      });

      const todayRevenue = todayOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const pendingOrders = orders.filter(order => order.status === 'Pending').length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
      totalCategories: categories.length,
        availableTables: tables.filter(t => t.isAvailable).length,
     todayRevenue,
        pendingOrders,
      });
      setError(null);
    } catch (err) {
      setError('Không thể tải dữ liệu dashboard.');
      console.error('Error fetching dashboard data:', err);
    } finally {
    setLoading(false);
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p className="subtitle">Tổng quan hệ thống Restaurant POS</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card products">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Sản phẩm</h3>
            <p className="stat-number">{stats.totalProducts}</p>
            <p className="stat-label">Tổng sản phẩm</p>
   </div>
        </div>

      <div className="stat-card orders">
          <div className="stat-icon">🛒</div>
          <div className="stat-content">
 <h3>Đơn hàng</h3>
            <p className="stat-number">{stats.totalOrders}</p>
            <p className="stat-label">Tổng đơn hàng</p>
          </div>
     </div>

 <div className="stat-card categories">
      <div className="stat-icon">📁</div>
          <div className="stat-content">
            <h3>Danh mục</h3>
          <p className="stat-number">{stats.totalCategories}</p>
       <p className="stat-label">Tổng danh mục</p>
  </div>
     </div>

        <div className="stat-card tables">
    <div className="stat-icon">🪑</div>
          <div className="stat-content">
    <h3>Bàn trống</h3>
   <p className="stat-number">{stats.availableTables}</p>
            <p className="stat-label">Sẵn sàng phục vụ</p>
          </div>
        </div>

      <div className="stat-card revenue">
  <div className="stat-icon">💰</div>
  <div className="stat-content">
            <h3>Doanh thu hôm nay</h3>
     <p className="stat-number">{stats.todayRevenue.toLocaleString('vi-VN')} đ</p>
          <p className="stat-label">Đơn hàng hoàn thành</p>
          </div>
 </div>

   <div className="stat-card pending">
 <div className="stat-icon">⏳</div>
          <div className="stat-content">
      <h3>Đơn chờ xử lý</h3>
            <p className="stat-number">{stats.pendingOrders}</p>
      <p className="stat-label">Cần xử lý</p>
          </div>
   </div>
  </div>

      <div className="quick-actions">
      <h3>Thao tác nhanh</h3>
        <div className="action-buttons">
       <button className="action-btn primary">
            <span className="action-icon">➕</span>
        <span>Tạo đơn hàng mới</span>
          </button>
      <button className="action-btn secondary">
          <span className="action-icon">📦</span>
         <span>Thêm sản phẩm</span>
  </button>
          <button className="action-btn success">
            <span className="action-icon">👥</span>
  <span>Quản lý bàn</span>
   </button>
  <button className="action-btn info">
            <span className="action-icon">📊</span>
     <span>Xem báo cáo</span>
          </button>
        </div>
      </div>

      <div className="system-info">
        <div className="info-card">
    <h4>🎯 Mục tiêu hôm nay</h4>
        <p>Phục vụ tốt nhất cho khách hàng</p>
  </div>
        <div className="info-card">
          <h4>📈 Hiệu suất</h4>
      <p>Hệ thống hoạt động ổn định</p>
      </div>
   <div className="info-card">
          <h4>🔔 Thông báo</h4>
 <p>{stats.pendingOrders > 0 ? `${stats.pendingOrders} đơn hàng cần xử lý` : 'Không có thông báo mới'}</p>
        </div>
      </div>
 </div>
  );
};

export default Dashboard;
