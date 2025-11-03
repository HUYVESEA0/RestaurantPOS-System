import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import ProductList from './components/Products/ProductList';
import OrderList from './components/Orders/OrderList';
import CategoryList from './components/Categories/CategoryList';
import TableList from './components/Tables/TableList';
import Dashboard from './components/Dashboard/Dashboard';

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <nav className="navbar">
       <div className="nav-container">
              <h1 className="nav-logo">Restaurant POS</h1>
<ul className="nav-menu">
<li className="nav-item">
            <Link to="/" className="nav-link">Dashboard</Link>
  </li>
     <li className="nav-item">
      <Link to="/products" className="nav-link">Sản phẩm</Link>
      </li>
      <li className="nav-item">
 <Link to="/categories" className="nav-link">Danh mục</Link>
              </li>
     <li className="nav-item">
 <Link to="/orders" className="nav-link">Đơn hàng</Link>
           </li>
         <li className="nav-item">
       <Link to="/tables" className="nav-link">Bàn</Link>
        </li>
       </ul>
     <div className="nav-user">
        <span className="user-info">
           👤 {user?.fullName} ({user?.role})
  </span>
                <button onClick={logout} className="btn-logout">
   Đăng xuất
     </button>
      </div>
    </div>
          </nav>

          <main className="main-content">
    <Routes>
   <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
 <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
       <Route path="/categories" element={<PrivateRoute><CategoryList /></PrivateRoute>} />
<Route path="/orders" element={<PrivateRoute><OrderList /></PrivateRoute>} />
      <Route path="/tables" element={<PrivateRoute><TableList /></PrivateRoute>} />
   <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </main>
        </>
      ) : (
        <Routes>
 <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
   <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
    <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
