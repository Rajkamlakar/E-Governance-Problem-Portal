import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav } from 'react-bootstrap';
import { ArrowLeft, Send } from 'lucide-react';

const ReportIssue = () => {
  const { user, addIssue } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    ward: '',
    priority: 'medium'
  });

  const categories = [
    'Street Lighting',
    'Waste Management',
    'Road Repair',
    'Water Supply',
    'Drainage',
    'Public Property',
    'Other'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.location || !formData.ward) {
      alert('Please fill all required fields');
      return;
    }

    addIssue(formData);
    alert('Issue reported successfully!');
    navigate('/citizen');
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="shadow-sm">
        <Container>
          <Navbar.Brand>E-Governance Portal</Navbar.Brand>
          <Nav className="ms-auto">
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={() => navigate('/citizen')}
            >
              <ArrowLeft size={16} className="me-1" />
              Back to Dashboard
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow">
              <Card.Body className="p-4">
                <h3 className="mb-4">Report New Issue</h3>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Issue Title *</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Brief title of the issue"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Detailed description of the issue"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Category *</Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Location *</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Exact location or landmark"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Ward Number *</Form.Label>
                    <Form.Select
                      name="ward"
                      value={formData.ward}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Ward</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={`Ward ${i + 1}`}>
                          Ward {i + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Priority</Form.Label>
                    <Form.Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button type="submit" variant="primary" size="lg" className="d-flex align-items-center justify-content-center gap-2">
                      <Send size={20} />
                      Submit Issue
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline-secondary" 
                      onClick={() => navigate('/citizen')}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ReportIssue;