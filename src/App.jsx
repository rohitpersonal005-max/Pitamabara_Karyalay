import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomerBookingPage from './pages/CustomerBookingPage';
import AstrologerLogin from './pages/AstrologerLogin';
import AstrologerDashboard from './pages/AstrologerDashboard';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('astrology_token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

const LoginRoute = ({ children }) => {
  const token = localStorage.getItem('astrology_token');
  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerBookingPage />} />
        <Route 
          path="/admin/login" 
          element={
            <LoginRoute>
              <AstrologerLogin />
            </LoginRoute>
          } 
        />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AstrologerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
