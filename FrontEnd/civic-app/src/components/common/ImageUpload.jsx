import { useState, useRef } from 'react';
import { Button, Modal, Card, Alert } from 'react-bootstrap';
import { Camera, Upload, X } from 'lucide-react';
import Webcam from 'react-webcam';
import { uploadToCloudinary, base64ToFile } from '../../utils/cloudinaryConfig';

const ImageUpload = ({ onImageUpload, currentImage }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);
      onImageUpload(imageUrl);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const capturePhoto = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return;

    setError('');
    setUploading(true);

    try {
      const file = base64ToFile(imageSrc, `photo-${Date.now()}.jpg`);
      const imageUrl = await uploadToCloudinary(file);
      onImageUpload(imageUrl);
      setShowCamera(false);
    } catch (err) {
      setError('Failed to upload photo. Please try again.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    onImageUpload('');
  };

  return (
    <div>
      <div className="d-flex gap-2 mb-3">
        <Button 
          variant="outline-primary" 
          onClick={() => setShowCamera(true)}
          disabled={uploading}
        >
          <Camera size={18} className="me-2" />
          Take Photo
        </Button>
        <Button 
          variant="outline-primary" 
          onClick={() => fileInputRef.current.click()}
          disabled={uploading}
        >
          <Upload size={18} className="me-2" />
          Upload from Device
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {uploading && (
        <Alert variant="info">
          Uploading image...
        </Alert>
      )}

      {currentImage && (
        <Card className="mb-3">
          <Card.Body className="p-2 position-relative">
            <img 
              src={currentImage} 
              alt="Preview" 
              style={{ 
                width: '100%', 
                maxHeight: '300px', 
                objectFit: 'cover',
                borderRadius: '8px'
              }} 
            />
            <Button
              variant="danger"
              size="sm"
              onClick={removeImage}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px'
              }}
            >
              <X size={16} />
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* Camera Modal */}
      <Modal show={showCamera} onHide={() => setShowCamera(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Capture Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: 'environment'
            }}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCamera(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={capturePhoto} disabled={uploading}>
            <Camera size={18} className="me-2" />
            {uploading ? 'Uploading...' : 'Capture'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImageUpload;