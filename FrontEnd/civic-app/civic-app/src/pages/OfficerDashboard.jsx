import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Container, Row, Col, Card, Button, Badge, Navbar, Nav, Form, ButtonGroup } from 'react-bootstrap';
import { LogOut, AlertCircle, Clock, CheckCircle, XCircle, Filter, MapPin } from 'lucide-react';

const OfficerDashboard = () => {
  const { user, issues, logout } = useApp();
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const wardIssues = issues.filter(issue => issue.ward === user.ward);

  const filteredIssues = wardIssues.filter(issue => {
    const statusMatch = filterStatus === 'all' || issue.status === filterStatus;
    const categoryMatch = filterCategory === 'all' || issue.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  const categories = ['all', 'Street Lighting', 'Waste Management', 'Road Repair', 'Water Supply', 'Drainage', 'Public Property', 'Other'];

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in-progress': return 'info';
      case 'resolved': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'in-progress': return <AlertCircle size={16} />;
      case 'resolved': return <CheckCircle size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return null;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold">Officer Dashboard</Navbar.Brand>
          <Nav className="ms-auto align-items-center">
            <Badge bg="info" className="me-3">{user.ward}</Badge>
            <span className="text-white me-3">{user.name}</span>
            <Button variant="outline-light" size="sm" onClick={handleLogout}>
              <LogOut size={16} className="me-1" />
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <h2 className="mb-1">Ward Issues Management</h2>
            <p className="text-muted">Monitor and resolve issues in {user.ward}</p>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col md={3}>
            <Card className="text-center border-warning">
              <Card.Body>
                <Clock size={32} className="text-warning mb-2" />
                <h3 className="mb-0">{wardIssues.filter(i => i.status === 'pending').length}</h3>
                <small className="text-muted">Pending</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-info">
              <Card.Body>
                <AlertCircle size={32} className="text-info mb-2" />
                <h3 className="mb-0">{wardIssues.filter(i => i.status === 'in-progress').length}</h3>
                <small className="text-muted">In Progress</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-success">
              <Card.Body>
                <CheckCircle size={32} className="text-success mb-2" />
                <h3 className="mb-0">{wardIssues.filter(i => i.status === 'resolved').length}</h3>
                <small className="text-muted">Resolved</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-secondary">
              <Card.Body>
                <MapPin size={32} className="text-secondary mb-2" />
                <h3 className="mb-0">{wardIssues.length}</h3>
                <small className="text-muted">Total Issues</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card className="mb-4">
          <Card.Body>
            <div className="d-flex align-items-center gap-2 mb-3">
              <Filter size={20} />
              <h5 className="mb-0">Filters</h5>
            </div>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Status</Form.Label>
                <ButtonGroup className="w-100">
                  <Button
                    variant={filterStatus === 'all' ? 'primary' : 'outline-primary'}
                    onClick={() => setFilterStatus('all')}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button
                    variant={filterStatus === 'pending' ? 'warning' : 'outline-warning'}
                    onClick={() => setFilterStatus('pending')}
                    size="sm"
                  >
                    Pending
                  </Button>
                  <Button
                    variant={filterStatus === 'in-progress' ? 'info' : 'outline-info'}
                    onClick={() => setFilterStatus('in-progress')}
                    size="sm"
                  >
                    In Progress
                  </Button>
                  <Button
                    variant={filterStatus === 'resolved' ? 'success' : 'outline-success'}
                    onClick={() => setFilterStatus('resolved')}
                    size="sm"
                  >
                    Resolved
                  </Button>
                </ButtonGroup>
              </Col>
              <Col md={6}>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  size="sm"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row>
          <Col>
            {filteredIssues.length === 0 ? (
              <Card className="text-center py-5">
                <Card.Body>
                  <AlertCircle size={48} className="text-muted mb-3" />
                  <h4 className="text-muted">No issues found</h4>
                  <p className="text-muted">No issues match the current filters</p>
                </Card.Body>
              </Card>
            ) : (
              filteredIssues.map(issue => (
                <Card 
                  key={issue.id} 
                  className="mb-3 issue-card"
                  onClick={() => navigate(`/issue/${issue.id}`)}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <h5 className="mb-0">{issue.title}</h5>
                          <Badge bg={getStatusVariant(issue.status)} className="d-flex align-items-center gap-1">
                            {getStatusIcon(issue.status)}
                            {issue.status}
                          </Badge>
                        </div>
                        <p className="text-muted mb-2">{issue.description}</p>
                        <div className="d-flex gap-3 text-muted small">
                          <span><MapPin size={14} /> {issue.location}</span>
                          <span>Category: {issue.category}</span>
                          <span>Priority: <span className={`priority-${issue.priority}`}>{issue.priority}</span></span>
                          <span>Reported by: {issue.reportedBy}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-muted small mt-2">
                      Reported: {new Date(issue.createdAt).toLocaleDateString()}
                    </div>
                  </Card.Body>
                </Card>
              ))
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OfficerDashboard;