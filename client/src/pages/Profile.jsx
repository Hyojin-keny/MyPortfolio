import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const infoCard = {
    padding: "8px 30px",
    marginBottom: "15px",
    backgroundColor: "#F8F8F5",
    border: "1px solid #ECECEC",
    borderRadius: "10px",
  };

  const labelStyle = {
    fontSize: "12px",
    color: "#999898",
    marginBottom: "5px",
  };

  const valueStyle = {
    fontSize: "16px",
    color: "#3d3d3d",
    wordBreak: "break-all",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "130px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#fff",
          borderRadius: "18px",
          padding: "45px",
          boxShadow: "0 8px 30px rgba(0,0,0,.08)",
        }}
      >
        {/* Profile Icon */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <CircleUserRound
              size={120}
              color="#A3B18A"
              strokeWidth={1.5}
            />
          </div>

        {user ? (
          <>
            {/* Name */}
            <div style={infoCard}>
              <div style={labelStyle}>Name</div>
              <div style={valueStyle}>{user?.name || "-"}</div>
            </div>

            {/* Email */}
            <div style={infoCard}>
              <div style={labelStyle}>Email</div>
              <div style={valueStyle}>{user?.email || "-"}</div>
            </div>

            {/* User ID */}
            <div style={infoCard}>
              <div style={labelStyle}>User ID</div>
              <div style={valueStyle}>{user?.id || "-"}</div>
            </div>

            {/* Role */}
            <div style={infoCard}>
              <div style={labelStyle}>Role</div>
              <div
                style={{
                  ...valueStyle,
                  textTransform: "capitalize",
                }}
              >
                {user?.role || "-"}
              </div>
            </div>

            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                marginTop: "30px",
                padding: "14px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#6B705C",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#5A5F4C";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#6B705C";
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#666",
            }}
          >
            You are not logged in.
          </p>
        )}
      </div>
    </div>
  );
}