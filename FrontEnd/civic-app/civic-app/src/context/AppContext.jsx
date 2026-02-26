import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('civic_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Load issues from localStorage
    const savedIssues = localStorage.getItem('civic_issues');
    if (savedIssues) {
      setIssues(JSON.parse(savedIssues));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('civic_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civic_user');
  };

  const addIssue = (issue) => {
    const newIssue = {
      ...issue,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      reportedBy: user.name
    };
    const updatedIssues = [...issues, newIssue];
    setIssues(updatedIssues);
    localStorage.setItem('civic_issues', JSON.stringify(updatedIssues));
    return newIssue;
  };

  const updateIssue = (id, updates) => {
    const updatedIssues = issues.map(issue =>
      issue.id === id ? { ...issue, ...updates, updatedAt: new Date().toISOString() } : issue
    );
    setIssues(updatedIssues);
    localStorage.setItem('civic_issues', JSON.stringify(updatedIssues));
  };

  const deleteIssue = (id) => {
    const updatedIssues = issues.filter(issue => issue.id !== id);
    setIssues(updatedIssues);
    localStorage.setItem('civic_issues', JSON.stringify(updatedIssues));
  };

  const value = {
    user,
    issues,
    loading,
    setLoading,
    login,
    logout,
    addIssue,
    updateIssue,
    deleteIssue
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};