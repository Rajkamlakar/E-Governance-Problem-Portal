import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Login from './pages/Login';
import CitizenDashboard from './pages/CitizenDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import ReportIssue from './pages/ReportIssue';
import IssueDetails from './pages/IssueDetails';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useApp();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'citizen' ? '/citizen' : '/officer'} />;
  }
  
  return children;
};

function AppRoutes() {
  const { user } = useApp();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to={user.role === 'citizen' ? '/citizen' : '/officer'} /> : <Login />} 
      />
      
      <Route 
        path="/citizen" 
        element={
          <ProtectedRoute allowedRole="citizen">
            <CitizenDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/citizen/report" 
        element={
          <ProtectedRoute allowedRole="citizen">
            <ReportIssue />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/officer" 
        element={
          <ProtectedRoute allowedRole="officer">
            <OfficerDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/issue/:id" 
        element={
          <ProtectedRoute>
            <IssueDetails />
          </ProtectedRoute>
        } 
      />
      
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </Router>
  );
}

export default App;