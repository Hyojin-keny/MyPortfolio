import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // 경로 조정

export default function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
  });

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    backgroundColor: '#ffffff',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#FFC74F',
    color: '#3d3d3d',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ 서버 라우팅: app.use('/api/contact', contactRoutes);
      const res = await api.post('/api/contact', formData);
      console.log('API response:', res.data);
      alert('Thank you! Your message has been received.');
      navigate('/');
    } catch (err) {
      console.error('API error:', err);
      alert(err.response?.data?.error || 'Sorry, something went wrong.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px', background: 'linear-gradient(135deg, #F8F7F1, #E6EAD9)'}}>
      <div
      style={{
        maxWidth: '550px',
        margin: '0 auto',
        backgroundColor: '#fff',
        padding: '35px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        color: '#3d3d3d',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '450px',
          margin: '0 auto',
        }}
      >
        <h1>Contact Me</h1>

          <div style={{ marginBottom: '30px' }}>
            <p><strong>Email:</strong> qncnwjs2@gmail.com</p>
            <p><strong>Phone:</strong> +82 (10) 3027-3766</p>
          </div>

          <form onSubmit={handleSubmit}>
            <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} required style={inputStyle} />
            <input name="lastName"  type="text" placeholder="Last Name" onChange={handleChange} required style={inputStyle} />
            <input name="phone"     type="tel" placeholder="Contact Number" onChange={handleChange} required style={inputStyle} />
            <input name="email"     type="email" placeholder="Email Address" onChange={handleChange} required style={inputStyle} />
            <textarea name="message" placeholder="Your Message" rows="4" onChange={handleChange} required style={{ ...inputStyle, resize: 'vertical' }} />
            <button type="submit" style={buttonStyle}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
