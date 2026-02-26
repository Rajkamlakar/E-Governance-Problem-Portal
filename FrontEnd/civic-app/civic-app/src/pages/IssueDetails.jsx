import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Container, Row, Col, Card, Button, Badge, Navbar, Nav, Form, Modal } from 'react-bootstrap';
import { ArrowLeft, MapPin, Calendar, User, Edit2, Trash2, CheckCircle } from 'lucide-react';

const IssueDetails = () => {
  const { id } = useParams();
  const { user, issues, updateIssue, deleteIssue } = useApp();
  const navigate = useNavigate();
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [remarks, setRemarks] = useState('');

  const issue = issues.find(i => i.id === id);

  if (!issue) {
    return (
      <Container className="py-5 text-center">
        <h3>Issue not found</h3>
        <Button variant="primary" onClick={() => navigate(-1)}>Go Back</Button>
      </Container>
    );
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'in-progress': return 'info';
      case 'resolved': return 'success';
      case 'rejected': return 'danger';
      default: return 'secondary';
    }
  };

  const handleUpdateStatus = () => {
    if (!newStatus) {
      alert('Please select a status');
      return;
    }
    updateIssue(id, { 
      status: newStatus, 
      remarks: remarks,
      resolvedBy: user.name,
      resolvedAt: new Date().toISOString()
    });
    setShowStatusModal(false);
    alert('Status updated successfully!');
  };

  const handleDelete = () => {
    deleteIssue(id);
    setShowDeleteModal(false);
    navigate(user.role === 'citizen' ? '/citizen' : '/officer');
  };

  const goBack = () => {
    navigate(user.role === 'citizen' ? '/citizen' : '/officer');
  };

  return (
    <>
      <Navbar bg={user.role === 'officer' ? 'dark' : 'primary'} variant="dark" className="shadow-sm">
        <Container>
          <Navbar.Brand>Issue Details</Navbar.Brand>
          <Nav className="ms-auto">
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={goBack}
            >
              <ArrowLeft size={16} className="me-1" />
              Back to Dashboard
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <h3 className="mb-2">{issue.title}</h3>
                    <Badge bg={getStatusVariant(issue.status)} className="px-3 py-2">
                      {issue.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="d-flex gap-2">
                    {user.role === 'officer' && (
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => {
                          setNewStatus(issue.status);
                          setRemarks(issue.remarks || '');
                          setShowStatusModal(true);
                        }}
                      >
                        <Edit2 size={16} className="me-1" />
                        Update Status
                      </Button>
                    )}
                    {user.role === 'citizen' && issue.reportedBy === user.name && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => setShowDeleteModal(true)}
                      >
                        <Trash2 size={16} className="me-1" />
                        Delete
                      </Button>
                    )}
                  </div>
                </div>

                <hr />

                <Row className="mb-4">
                  <Col md={6}>
                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">Category</small>
                      <strong>{issue.category}</strong>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">Priority</small>
                      <strong className={`priority-${issue.priority}`}>
                        {issue.priority.toUpperCase()}
                      </strong>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <small className="text-muted d-block mb-1"><MapPin size={14} /> Location</small>
                      <strong>{issue.location}</strong>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">Ward</small>
                      <strong>{issue.ward}</strong>
                    </div>
                  </Col>
                </Row>

                <div className="mb-4">
                  <h5 className="mb-2">Description</h5>
                  <p className="text-muted">{issue.description}</p>
                </div>

                {issue.remarks && (
                  <div className="mb-4">
                    <h5 className="mb-2">Officer Remarks</h5>
                    <Card bg="light">
                      <Card.Body>
                        <p className="mb-0">{issue.remarks}</p>
                      </Card.Body>
                    </Card>
                  </div>
                )}

                <hr />

                <Row className="text-muted small">
                  <Col md={6}>
                    <div className="mb-2">
                      <Calendar size={14} className="me-1" />
                      Reported: {new Date(issue.createdAt).toLocaleString()}
                    </div>
                    <div>
                      <User size={14} className="me-1" />
                      Reported by: {issue.reportedBy}
                    </div>
                  </Col>
                  <Col md={6}>
                    {issue.resolvedAt && (
                      <>
                        <div className="mb-2">
                          <CheckCircle size={14} className="me-1" />
                          Resolved: {new Date(issue.resolvedAt).toLocaleString()}
                        </div>
                        <div>
                          <User size={14} className="me-1" />
                          Resolved by: {issue.resolvedBy}
                        </div>
                      </>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Status Update Modal */}
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Issue Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add remarks or notes..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateStatus}>
            Update Status
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this issue? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Issue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IssueDetails;