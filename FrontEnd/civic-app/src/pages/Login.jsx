// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useApp } from '../context/AppContext';
// import { Container, Row, Col, Card, Form, Button, ButtonGroup } from 'react-bootstrap';
// import { UserCircle, Shield } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from '../components/common/LanguageSwitcher';
// import { getStates, getDistricts, getCities, getWards } from '../utils/locationData';

// const Login = () => {
//   const { t } = useTranslation();
//   const [role, setRole] = useState('citizen');
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     state: '',
//     district: '',
//     city: '',
//     ward: ''
//   });
  
//   const [districts, setDistricts] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [wards, setWards] = useState([]);
  
//   const navigate = useNavigate();
//   const { login } = useApp();

//   const states = getStates();

//   useEffect(() => {
//     if (formData.state) {
//       const districtList = getDistricts(formData.state);
//       setDistricts(districtList);
//       setFormData(prev => ({ ...prev, district: '', city: '', ward: '' }));
//     }
//   }, [formData.state]);

//   useEffect(() => {
//     if (formData.state && formData.district) {
//       const cityList = getCities(formData.state, formData.district);
//       setCities(cityList);
//       setFormData(prev => ({ ...prev, city: '', ward: '' }));
//     }
//   }, [formData.district]);

//   useEffect(() => {
//     if (formData.state && formData.district && formData.city) {
//       const wardList = getWards(formData.state, formData.district, formData.city);
//       setWards(wardList);
//       setFormData(prev => ({ ...prev, ward: '' }));
//     }
//   }, [formData.city]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!formData.name || !formData.phone) {
//       alert('Please fill all required fields');
//       return;
//     }

//     if (role === 'officer' && (!formData.state || !formData.district || !formData.city || !formData.ward)) {
//       alert('Please select complete location hierarchy');
//       return;
//     }

//     const userData = {
//       ...formData,
//       role,
//       id: Date.now().toString(),
//       fullLocation: `${formData.ward}, ${formData.city}, ${formData.district}, ${formData.state}`
//     };

//     try {
//       await login(userData);
//       navigate(role === 'citizen' ? '/citizen' : '/officer/dashboard');
//     } catch (err) {
//       alert(err.message || 'Login failed. Please try again.');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center" style={{
//       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//     }}>
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={6} lg={5}>
//             <div className="text-end mb-3">
//               <LanguageSwitcher />
//             </div>
            
//             <Card className="shadow-lg border-0">
//               <Card.Body className="p-5">
//                 <div className="text-center mb-4">
//                   <div className="mb-3">
//                     <img 
//                       src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'%3E%3C/path%3E%3Cpolyline points='9 22 9 12 15 12 15 22'%3E%3C/polyline%3E%3C/svg%3E" 
//                       alt="Logo"
//                       style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
//                     />
//                   </div>
//                   <h2 className="fw-bold text-primary">{t('Smart Civic Issue Reporter')}</h2>
//                   <p className="text-muted">{t('Welcome')}</p>
//                 </div>

//                 <div className="mb-4">
//                   <ButtonGroup className="w-100">
//                     <Button
//                       variant={role === 'citizen' ? 'primary' : 'outline-primary'}
//                       onClick={() => setRole('citizen')}
//                       className="d-flex align-items-center justify-content-center gap-2"
//                     >
//                       <UserCircle size={20} />
//                       {t('citizen')}
//                     </Button>
//                     <Button
//                       variant={role === 'officer' ? 'primary' : 'outline-primary'}
//                       onClick={() => setRole('officer')}
//                       className="d-flex align-items-center justify-content-center gap-2"
//                     >
//                       <Shield size={20} />
//                       {t('officer')}
//                     </Button>
//                   </ButtonGroup>
//                 </div>

//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group className="mb-3">
//                     <Form.Label>{t('fullName')} *</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder={t('fullName')}
//                       required
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3">
//                     <Form.Label>{t('phone')} *</Form.Label>
//                     <Form.Control
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       placeholder={t('phone')}
//                       required
//                     />
//                   </Form.Group>

//                   {role === 'officer' && (
//                     <>
//                       <Form.Group className="mb-3">
//                         <Form.Label>{t('selectState')} *</Form.Label>
//                         <Form.Select
//                           name="state"
//                           value={formData.state}
//                           onChange={handleChange}
//                           required
//                         >
//                           <option value="">{t('selectState')}</option>
//                           {states.map(state => (
//                             <option key={state} value={state}>{state}</option>
//                           ))}
//                         </Form.Select>
//                       </Form.Group>

//                       <Form.Group className="mb-3">
//                         <Form.Label>{t('selectDistrict')} *</Form.Label>
//                         <Form.Select
//                           name="district"
//                           value={formData.district}
//                           onChange={handleChange}
//                           disabled={!formData.state}
//                           required
//                         >
//                           <option value="">{t('selectDistrict')}</option>
//                           {districts.map(district => (
//                             <option key={district} value={district}>{district}</option>
//                           ))}
//                         </Form.Select>
//                       </Form.Group>

//                       <Form.Group className="mb-3">
//                         <Form.Label>{t('selectCity')} *</Form.Label>
//                         <Form.Select
//                           name="city"
//                           value={formData.city}
//                           onChange={handleChange}
//                           disabled={!formData.district}
//                           required
//                         >
//                           <option value="">{t('selectCity')}</option>
//                           {cities.map(city => (
//                             <option key={city} value={city}>{city}</option>
//                           ))}
//                         </Form.Select>
//                       </Form.Group>

//                       <Form.Group className="mb-3">
//                         <Form.Label>{t('selectWard')} *</Form.Label>
//                         <Form.Select
//                           name="ward"
//                           value={formData.ward}
//                           onChange={handleChange}
//                           disabled={!formData.city}
//                           required
//                         >
//                           <option value="">{t('selectWard')}</option>
//                           {wards.map(ward => (
//                             <option key={ward} value={ward}>{ward}</option>
//                           ))}
//                         </Form.Select>
//                       </Form.Group>
//                     </>
//                   )}

//                   <Button type="submit" variant="primary" className="w-100 py-2 mt-3">
//                     {t('loginAs')} {role === 'citizen' ? t('citizen') : t('officer')}
//                   </Button>
//                 </Form>

//                 <div className="text-center mt-4">
//                   <small className="text-muted">
//                     {role === 'citizen' ? t('citizenHelp') : t('officerHelp')}
//                   </small>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Login;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Container, Row, Col, Card, Form, Button, ButtonGroup } from 'react-bootstrap';
import { UserCircle, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import { getStates, getDistricts, getCities, getWards } from '../utils/locationData';

// ✅ Allowed officers list
const allowedOfficers = [
  { name: 'Raj Kamlakar', phone: '9322823295' },
  { name: 'Sourabh yelpale', phone: '9322823232' },
  { name: 'Admin', phone: '7777777777' }
];

const Login = () => {
  const { t } = useTranslation();
  const [role, setRole] = useState('citizen');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    district: '',
    city: '',
    ward: ''
  });

  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [wards, setWards] = useState([]);
  
  const navigate = useNavigate();
  const { login } = useApp();
  const states = getStates();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert('Please fill all required fields');
      return;
    }

    if (role === 'officer') {
      // ✅ Restrict to allowed officers only
      const officerAllowed = allowedOfficers.some(
        o => o.name.toLowerCase() === formData.name.toLowerCase() && o.phone === formData.phone
      );

      if (!officerAllowed) {
        alert('Access Denied: You are not an authorized officer.');
        return;
      }

      if (!formData.state || !formData.district || !formData.city || !formData.ward) {
        alert('Please select complete location hierarchy');
        return;
      }
    }

    const userData = {
      ...formData,
      role,
      id: Date.now().toString(),
      fullLocation: `${formData.ward}, ${formData.city}, ${formData.district}, ${formData.state}`
    };

    try {
      await login(userData);
      navigate(role === 'citizen' ? '/citizen' : '/officer/dashboard');
    } catch (err) {
      alert(err.message || 'Login failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="text-end mb-3">
              <LanguageSwitcher />
            </div>

            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <img
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'%3E%3C/path%3E%3Cpolyline points='9 22 9 12 15 12 15 22'%3E%3C/polyline%3E%3C/svg%3E"
                      alt="Logo"
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
                    />
                  </div>
                  <h2 className="fw-bold text-primary">{t('Smart Civic Issue Reporter')}</h2>
                  <p className="text-muted">{t('Better Municipal Workflow')}</p>
                </div>

                <div className="mb-4">
                  <ButtonGroup className="w-100">
                    <Button
                      variant={role === 'citizen' ? 'primary' : 'outline-primary'}
                      onClick={() => setRole('citizen')}
                      className="d-flex align-items-center justify-content-center gap-2"
                    >
                      <UserCircle size={20} />
                      {t('citizen')}
                    </Button>
                    <Button
                      variant={role === 'officer' ? 'primary' : 'outline-primary'}
                      onClick={() => setRole('officer')}
                      className="d-flex align-items-center justify-content-center gap-2"
                    >
                      <Shield size={20} />
                      {t('officer')}
                    </Button>
                  </ButtonGroup>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t('fullName')} *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('fullName')}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>{t('phone')} *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('phone')}
                      required
                    />
                  </Form.Group>

                  {role === 'officer' && (
                    <>
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
                    </>
                  )}

                  <Button type="submit" variant="primary" className="w-100 py-2 mt-3">
                    {t('loginAs')} {role === 'citizen' ? t('citizen') : t('officer')}
                  </Button>
                </Form>

                <div className="text-center mt-4">
                  <small className="text-muted">
                    {role === 'citizen' ? t('citizenHelp') : t('officerHelp')}
                  </small>
                </div>

                {/* ✅ Show allowed officer info for testing */}
                {role === 'officer' && (
                  <div className="text-center mt-3">
                    <small className="text-muted">Allowed Officers:</small>
                    <ul className="list-unstyled mt-2">
                      {allowedOfficers.map((o, i) => (
                        <li key={i} className="small text-secondary">
                          {o.name} — {o.phone}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
