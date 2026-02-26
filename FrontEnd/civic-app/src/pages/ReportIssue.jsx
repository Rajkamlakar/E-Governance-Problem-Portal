import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Container, Row, Col, Card, Form, Button, Navbar, Nav } from 'react-bootstrap';
import { ArrowLeft, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import ImageUpload from '../components/common/ImageUpload';
import { getStates, getDistricts, getCities, getWards } from '../utils/locationData';

const ReportIssue = () => {
  const { t } = useTranslation();
  const { user, addIssue } = useApp();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    state: '',
    district: '',
    city: '',
    ward: '',
    priority: 'medium',
    imageUrl: null
  });

  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [wards, setWards] = useState([]);

  const states = getStates();

  const categories = [
    t('lighting'),
    t('waste'),
    t('road'),
    t('water'),
    t('drainage'),
    t('property'),
    t('other')
  ];

  useEffect(() => {
    if (formData.state) {
      const districtList = getDistricts(formData.state);
      setDistricts(districtList);
      setFormData(prev => ({ ...prev, district: '', city: '', ward: '' }));
    }
  }, [formData.state]);

  useEffect(() => {
    if (formData.state && formData.district) {
      const cityList = getCities(formData.state, formData.district);
      setCities(cityList);
      setFormData(prev => ({ ...prev, city: '', ward: '' }));
    }
  }, [formData.district]);

  useEffect(() => {
    if (formData.state && formData.district && formData.city) {
      const wardList = getWards(formData.state, formData.district, formData.city);
      setWards(wardList);
      setFormData(prev => ({ ...prev, ward: '' }));
    }
  }, [formData.city]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (imageUrl) => {
    setFormData({
      ...formData,
      imageUrl
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.location || 
        !formData.state || !formData.district || !formData.city || !formData.ward) {
      alert(t('required'));
      return;
    }

    const issueData = {
      ...formData,
      fullLocation: `${formData.ward}, ${formData.city}, ${formData.district}, ${formData.state}`
    };

    addIssue(issueData);
    alert('Issue reported successfully!');
    navigate('/citizen');
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="shadow-sm">
        <Container>
          <Navbar.Brand>{t('title')}</Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center gap-2">
            <LanguageSwitcher />
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={() => navigate('/citizen')}
            >
              <ArrowLeft size={16} className="me-1" />
              {t('back')}
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
                <h3 className="mb-4 text-center">{t('reportNew')}</h3>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t('title')} *</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder={t('titlePlaceholder')}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>{t('description')} *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder={t('descriptionPlaceholder')}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>{t('category')} *</Form.Label>
                    <Form.Select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">{t('selectCategory')}</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t('selectState')} *</Form.Label>
                        <Form.Select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        >
                          <option value="">{t('selectState')}</option>
                          {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t('selectDistrict')} *</Form.Label>
                        <Form.Select
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          disabled={!formData.state}
                          required
                        >
                          <option value="">{t('selectDistrict')}</option>
                          {districts.map(district => (
                            <option key={district} value={district}>{district}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t('selectCity')} *</Form.Label>
                        <Form.Select
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          disabled={!formData.district}
                          required
                        >
                          <option value="">{t('selectCity')}</option>
                          {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t('selectWard')} *</Form.Label>
                        <Form.Select
                          name="ward"
                          value={formData.ward}
                          onChange={handleChange}
                          disabled={!formData.city}
                          required
                        >
                          <option value="">{t('selectWard')}</option>
                          {wards.map(ward => (
                            <option key={ward} value={ward}>{ward}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>{t('location')} *</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder={t('locationPlaceholder')}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>{t('priority')}</Form.Label>
                    <Form.Select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="low">{t('ow')}</option>
                      <option value="medium">{t('medium')}</option>
                      <option value="high">{t('high')}</option>
                    </Form.Select>
                  </Form.Group>

                  <ImageUpload 
                    onImageUpload={handleImageUpload}
                    existingImage={formData.imageUrl}
                  />

                  <div className="d-grid gap-2 mt-4">
                    <Button type="submit" variant="primary" size="lg" className="d-flex align-items-center justify-content-center gap-2">
                      <Send size={20} />
                      {t('submit')}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline-secondary" 
                      onClick={() => navigate('/citizen')}
                    >
                      {t('cancel')}
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