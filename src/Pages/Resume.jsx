import React from "react";

function Resume() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1 style={{ color: "white" }}>My Resume</h1>

      {/* PDF Viewer */}
      <iframe
        src="/resume.pdf"
        title="Resume"
        width="100%"
        height="600px"
        style={{
          border: "none",
          marginTop: "20px",
          borderRadius: "10px"
        }}
      ></iframe>

      {/* Download Button */}
      <a 
        href="/resume.pdf" 
        download="Resume.pdf"
        style={{
          display: "inline-block",
          marginTop: "20px",
          background: "#ff6b35",
          padding: "12px 20px",
          color: "white",
          borderRadius: "10px",
          fontSize: "16px",
          fontWeight: "600",
          textDecoration: "none"
        }}
      >
        Download Resume
      </a>
    </div>
  );
}

export default Resume;
