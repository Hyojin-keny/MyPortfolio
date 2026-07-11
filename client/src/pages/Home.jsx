import { Link } from 'react-router-dom';
import Lottie from "lottie-react";
import codingAnimation from "../assets/lottie/Dark Mode Button.json";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 80px",
      }}
    >
      {/* 왼쪽 */}
      <div style={{ textAlign: "left" }}>
        <h1
          style={{
            fontSize: "4.5rem",
            marginBottom: "20px",
            color: "#3d3d3d",
          }}
        >
          Think,  Talk
          <br />
          <span style={{ color: "#6B705C" }}>Create</span>
        </h1>

        <p
          style={{
            fontSize: "1.2rem",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          Welcome to My Portfolio
        </p>

        <Link to="/about">
          <button
            style={{
              padding: "12px 24px",
              background: "#6B705C",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            About Me
          </button>
        </Link>
      </div>

      {/* 오른쪽 */}
      <Lottie
        animationData={codingAnimation}
        loop
        style={{
          width: "450px",
        }}
      />
    </div>
  );
}