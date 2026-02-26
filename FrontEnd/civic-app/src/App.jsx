import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Login from './pages/Login';
import OfficerLogin from './pages/OfficerLogin';
import OfficerDashboard from './pages/OfficerDashboard';
import CitizenDashboard from './pages/CitizenDashboard';
import ReportIssue from './pages/ReportIssue';
import IssueDetails from './pages/IssueDetails';
import ProtectedRoute from './components/common/ProtectedRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n/config';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/officer/login" element={<OfficerLogin />} />
          
          <Route 
            path="/citizen" 
            element={
              <ProtectedRoute>
                <CitizenDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/report-issue" 
            element={
              <ProtectedRoute>
                <ReportIssue />
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
          
          <Route 
            path="/officer/dashboard" 
            element={
              <ProtectedRoute officerOnly>
                <OfficerDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;