import { useState } from "react";
import api from "../api";
import {
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
  Send,
  ContactRound,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.post("/api/contact", formData);

      console.log("API response:", res.data);

      setStatus({
        type: "success",
        message: "Your message has been sent successfully.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error("API error:", err);

      setStatus({
        type: "error",
        message:
          err.response?.data?.error ||
          "Sorry, your message could not be sent.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 14px 14px 44px",
    backgroundColor: "#ffffff",
    color: "#3d3d3d",
    border: "1px solid #deded5",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const contactItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "28px",
  };

  const iconBoxStyle = {
    width: "46px",
    height: "46px",
    minWidth: "46px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: "50%",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "70px 20px 70px",
        boxSizing: "border-box",
      }}
    >
      {/* Page heading */}
      <div
        style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1>Contact Me</h1>
        <div
          style={{
            width: '60px',
            height: '4px',
            backgroundColor: '#B08D57',
            margin: '0 auto 70px',
            borderRadius: '2px'
          }}
        ></div>
      </div>

      {/* Contact container */}
      <div
        style={{
          width: "100%",
          maxWidth: "1050px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Contact information */}
        <div
          style={{
            padding: "50px 40px",
            background:
              "linear-gradient(145deg, #6B705C 0%, #8D8F79 100%)",
            color: "#ffffff",
          }}
        >
          <h2
            style={{
              margin: "0 0 50px",
              fontSize: "27px",
            }}
          >
            Contact Information
          </h2>

          <div style={contactItemStyle}>
            <div style={iconBoxStyle}>
              <Mail size={21} />
            </div>

            <div>
              <p
                style={{
                  margin: "0 0 5px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Email
              </p>

              <a
                href="mailto:qncnwjs2@gmail.com"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                  wordBreak: "break-word",
                }}
              >
                qncnwjs2@gmail.com
              </a>
            </div>
          </div>

          <div style={contactItemStyle}>
            <div style={iconBoxStyle}>
              <Phone size={21} />
            </div>

            <div>
              <p
                style={{
                  margin: "0 0 5px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Phone
              </p>

              <a
                href="tel:+821030273766"
                style={{
                  color: "#ffffff",
                  textDecoration: "none",
                }}
              >
                +82 (10) 3027-3766
              </a>
            </div>
          </div>

          <div style={contactItemStyle}>
            <div style={iconBoxStyle}>
              <MapPin size={21} />
            </div>

            <div>
              <p
                style={{
                  margin: "0 0 5px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Location
              </p>

              <p style={{ margin: 0 }}>Korea, Busan</p>
            </div>
          </div>

          <div
            style={{
              marginTop: "45px",
              paddingTop: "25px",
              borderTop: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              I will respond as soon as possible after reviewing your message.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div
          style={{
            padding: "50px 40px",
          }}
        >
          <h2
            style={{
              margin: "0 0 30px",
              color: "#3d3d3d",
              fontSize: "27px",
            }}
          >
            Send a Message
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name fields */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "15px",
                marginBottom: "15px",
              }}
            >
              <div style={{ position: "relative" }}>
                <User
                  size={19}
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "15px",
                    color: "#8D8F79",
                  }}
                />

                <input
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6B705C";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(107,112,92,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#deded5";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              <div style={{ position: "relative" }}>
                <User
                  size={19}
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "15px",
                    color: "#8D8F79",
                  }}
                />

                <input
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#6B705C";
                    e.target.style.boxShadow =
                      "0 0 0 3px rgba(107,112,92,0.12)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#deded5";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Phone */}
            <div
              style={{
                position: "relative",
                marginBottom: "15px",
              }}
            >
              <Phone
                size={19}
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "15px",
                  color: "#8D8F79",
                }}
              />

              <input
                name="phone"
                type="tel"
                placeholder="Contact Number"
                value={formData.phone}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "#6B705C";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(107,112,92,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#deded5";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Email */}
            <div
              style={{
                position: "relative",
                marginBottom: "15px",
              }}
            >
              <Mail
                size={19}
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "15px",
                  color: "#8D8F79",
                }}
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = "#6B705C";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(107,112,92,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#deded5";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Message */}
            <div
              style={{
                position: "relative",
                marginBottom: "20px",
              }}
            >
              <MessageSquare
                size={19}
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  color: "#8D8F79",
                }}
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  minHeight: "140px",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#6B705C";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(107,112,92,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#deded5";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Status message */}
            {status.message && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "18px",
                  padding: "12px 15px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  backgroundColor:
                    status.type === "success" ? "#edf7ed" : "#fff1f0",
                  color:
                    status.type === "success" ? "#2e7d32" : "#c62828",
                  border:
                    status.type === "success"
                      ? "1px solid #c8e6c9"
                      : "1px solid #ffcdd2",
                }}
              >
                {status.type === "success" ? (
                  <CheckCircle size={19} />
                ) : (
                  <AlertCircle size={19} />
                )}

                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "14px 25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: isSubmitting ? "#999c91" : "#6B705C",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                boxShadow: "0 5px 15px rgba(107,112,92,0.25)",
                transition: "0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = "#565b4a";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = "#6B705C";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              <Send size={19} />

              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}