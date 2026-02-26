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

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('civic_user');
    const storedOfficer = localStorage.getItem('officer');
    const storedIssues = localStorage.getItem('civic_issues');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (storedOfficer) {
      // Convert officer data to user format for consistency
      const officerData = JSON.parse(storedOfficer);
      const officerUser = {
        ...officerData,
        name: officerData.name,
        email: officerData.email,
        role: officerData.role || 'officer',
        isOfficer: true
      };
      setUser(officerUser);
    }

    if (storedIssues) {
      setIssues(JSON.parse(storedIssues));
    }
  }, []);

  // Save issues to localStorage whenever they change
  useEffect(() => {
    if (issues.length > 0) {
      localStorage.setItem('civic_issues', JSON.stringify(issues));
    }
  }, [issues]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('civic_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('civic_user');
    localStorage.removeItem('officer');
    localStorage.removeItem('token');
  };

  const addIssue = (issue) => {
    const newIssue = {
      ...issue,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      reportedBy: user.name,
      reportedByEmail: user.email
    };
    setIssues([newIssue, ...issues]);
    return newIssue;
  };

  const updateIssue = (issueId, updates) => {
    setIssues(issues.map(issue => 
      issue.id === issueId 
        ? { ...issue, ...updates, updatedAt: new Date().toISOString() }
        : issue
    ));
  };

  const deleteIssue = (issueId) => {
    setIssues(issues.filter(issue => issue.id !== issueId));
  };

  const getIssuesByUser = () => {
    if (!user) return [];
    return issues.filter(issue => issue.reportedByEmail === user.email);
  };

  const getIssuesByWard = () => {
    if (!user || user.role !== 'officer') return [];
    return issues.filter(issue => 
      issue.state === user.state &&
      issue.district === user.district &&
      issue.city === user.city &&
      issue.ward === user.ward
    );
  };

  const value = {
    user,
    issues,
    login,
    logout,
    addIssue,
    updateIssue,
    deleteIssue,
    getIssuesByUser,
    getIssuesByWard
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};