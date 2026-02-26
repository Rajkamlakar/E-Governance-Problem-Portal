import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Container, Row, Col, Card, Button, Badge, Navbar, Nav } from 'react-bootstrap';
import { Plus, LogOut, AlertCircle, Clock, CheckCircle, XCircle, MapPin } from 'lucide-react';

const CitizenDashboard = () => {
  const { user, issues, logout } = useApp();
  const navigate = useNavigate();

  const myIssues = issues.filter(issue => issue.reportedBy === user.name);

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
      <Navbar bg="primary" variant="dark" className="shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold">E-Governance Portal</Navbar.Brand>
          <Nav className="ms-auto align-items-center">
            <span className="text-white me-3">Welcome, {user.name}</span>
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
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="mb-1">My Reported Issues</h2>
                <p className="text-muted">Track your civic issue reports</p>
              </div>
              <Button 
                variant="primary" 
                onClick={() => navigate('/citizen/report')}
                className="d-flex align-items-center gap-2"
              >
                <Plus size={20} />
                Report New Issue
              </Button>
            </div>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col md={3}>
            <Card className="text-center border-warning">
              <Card.Body>
                <Clock size={32} className="text-warning mb-2" />
                <h3 className="mb-0">{myIssues.filter(i => i.status === 'pending').length}</h3>
                <small className="text-muted">Pending</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-info">
              <Card.Body>
                <AlertCircle size={32} className="text-info mb-2" />
                <h3 className="mb-0">{myIssues.filter(i => i.status === 'in-progress').length}</h3>
                <small className="text-muted">In Progress</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-success">
              <Card.Body>
                <CheckCircle size={32} className="text-success mb-2" />
                <h3 className="mb-0">{myIssues.filter(i => i.status === 'resolved').length}</h3>
                <small className="text-muted">Resolved</small>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-secondary">
              <Card.Body>
                <MapPin size={32} className="text-secondary mb-2" />
                <h3 className="mb-0">{myIssues.length}</h3>
                <small className="text-muted">Total Issues</small>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            {myIssues.length === 0 ? (
              <Card className="text-center py-5">
                <Card.Body>
                  <AlertCircle size={48} className="text-muted mb-3" />
                  <h4 className="text-muted">No issues reported yet</h4>
                  <p className="text-muted mb-4">Start by reporting your first civic issue</p>
                  <Button variant="primary" onClick={() => navigate('/citizen/report')}>
                    Report Issue
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              myIssues.map(issue => (
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

export default CitizenDashboard;