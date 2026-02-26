import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Container, Row, Col, Card, Form, Button, ButtonGroup } from 'react-bootstrap';
import { UserCircle, Shield } from 'lucide-react';

const Login = () => {
  const [role, setRole] = useState('citizen');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ward: ''
  });
  const navigate = useNavigate();
  const { login } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      alert('Please fill all required fields');
      return;
    }

    if (role === 'officer' && !formData.ward) {
      alert('Please select a ward');
      return;
    }

    const userData = {
      ...formData,
      role,
      id: Date.now().toString()
    };

    login(userData);
    navigate(role === 'citizen' ? '/citizen' : '/officer');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary">E-Governance Portal</h2>
                  <p className="text-muted">Municipal Ward Management System</p>
                </div>

                <div className="mb-4">
                  <ButtonGroup className="w-100">
                    <Button
                      variant={role === 'citizen' ? 'primary' : 'outline-primary'}
                      onClick={() => setRole('citizen')}
                      className="d-flex align-items-center justify-content-center gap-2"
                    >
                      <UserCircle size={20} />
                      Citizen
                    </Button>
                    <Button
                      variant={role === 'officer' ? 'primary' : 'outline-primary'}
                      onClick={() => setRole('officer')}
                      className="d-flex align-items-center justify-content-center gap-2"
                    >
                      <Shield size={20} />
                      Officer
                    </Button>
                  </ButtonGroup>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </Form.Group>

                  {role === 'officer' && (
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
                  )}

                  <Button type="submit" variant="primary" className="w-100 py-2 mt-3">
                    Login as {role === 'citizen' ? 'Citizen' : 'Officer'}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    {role === 'citizen' 
                      ? 'Report civic issues in your area'
                      : 'Manage and resolve ward issues'}
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;