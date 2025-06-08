import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", color: "white", padding: "30px" }}>
      <h2>Form Submitted Successfully!</h2>
      <pre style={{
        textAlign: "left",
        background: "#334155",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "20px auto",
        overflowX: "auto",
      }}>
        {JSON.stringify(state, null, 2)}
      </pre>

      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          backgroundColor: "#00ff99",
          color: "#1e1e1e",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Go Back
      </button>
    </div>
  );
}

export default SuccessPage;
