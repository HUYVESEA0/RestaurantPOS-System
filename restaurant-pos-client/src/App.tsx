import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import ProductList from './components/Products/ProductList';
import ProductForm from './components/Products/ProductForm';
import OrderList from './components/Orders/OrderList';
import OrderForm from './components/Orders/OrderForm';
import OrderDetail from './components/Orders/OrderDetail';
import CategoryList from './components/Categories/CategoryList';
import CategoryForm from './components/Categories/CategoryForm';
import TableList from './components/Tables/TableList';
import TableForm from './components/Tables/TableForm';
import Dashboard from './components/Dashboard/Dashboard';

function AppContent() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <nav className="navbar">
       <div className="nav-container">
              <h1 className="nav-logo">Nhà Hàng BÚN ĐẬU MẸT</h1>
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
 
      {/* Products */}
      <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
 <Route path="/products/new" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
<Route path="/products/edit/:id" element={<PrivateRoute><ProductForm /></PrivateRoute>} />
      
      {/* Categories */}
    <Route path="/categories" element={<PrivateRoute><CategoryList /></PrivateRoute>} />
      <Route path="/categories/new" element={<PrivateRoute><CategoryForm /></PrivateRoute>} /> {/* ✅ ADD */}
  <Route path="/categories/edit/:id" element={<PrivateRoute><CategoryForm /></PrivateRoute>} /> {/* ✅ ADD */}
   
      {/* Orders */}
      <Route path="/orders" element={<PrivateRoute><OrderList /></PrivateRoute>} />
      <Route path="/orders/new" element={<PrivateRoute><OrderForm /></PrivateRoute>} /> {/* ✅ ADD */}
      <Route path="/orders/:id" element={<PrivateRoute><OrderDetail /></PrivateRoute>} /> {/* ✅ ADD */}
      
      {/* Tables */}
      <Route path="/tables" element={<PrivateRoute><TableList /></PrivateRoute>} />
   <Route path="/tables/new" element={<PrivateRoute><TableForm /></PrivateRoute>} />
      <Route path="/tables/edit/:id" element={<PrivateRoute><TableForm /></PrivateRoute>} />
   
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