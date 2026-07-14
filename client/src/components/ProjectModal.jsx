import { useEffect, useState } from "react";

export default function ProjectModal({
  category,
  projects,
  close,
  user,
  onDelete,
  onEdit,
}) {

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [category]);

  if (!category) return null;

  const filteredProjects = projects.filter(
    (project) => project.category === category.id
  );

  const linkStyle = {
    display: "inline-block",
    padding: "8px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    transition: "0.2s ease",
  };

  if (filteredProjects.length === 0) {
    return (
      <div
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2000,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "550px",
            background: "#fff",
            padding: "25px",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <button
            onClick={close}
            style={{
              position: "absolute",
              top: "10px",
              right: "15px",
              border: "none",
              background: "transparent",
              fontSize: "15px",
              cursor: "pointer",
              backgroundColor: "#e2e2e2"
            }}
          >
            ×
          </button>

          <h2>{category.title}</h2>

          <p style={{ marginTop: "30px" }}>
            No projects in this category.
          </p>
        </div>
      </div>
    );
  }

  const project = filteredProjects[currentIndex];

  return (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "600px",
          background: "#fff",
          padding: "25px",
          borderRadius: "12px",
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={close}
          style={{
            position: "absolute",
            top: "12px",
            right: "15px",
            border: "none",
            background: "transparent",
            fontSize: "15px",
            cursor: "pointer",
            backgroundColor: "#e2e2e2"
          }}
        >
          ×
        </button>

        {/* Category */}
        <span
          style={{
              display: "inline-block",
              padding: "6px 12px",
              backgroundColor: "#EEF0E8",
              color: "#6B705C",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
          }}
        >
          {category.title}
        </span>

        {/* Title */}
        <h2>{project.title}</h2>

        {/* Thumbnail */}
        <img
          src={project.thumbnail}
          alt={project.title}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "8px",
            // marginTop: "15px",
          }}
        />

        {/* Description */}
        <p
          style={{
            marginTop: "20px",
            lineHeight: "1.7",
            whiteSpace: "pre-line",
          }}
        >
          {project.description}
        </p>

        {/* Links */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...linkStyle,
                  backgroundColor: "#6B705C",
                  color: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#565b4b";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#6B705C";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Live Demo ↗
              </a>
          )}

          {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...linkStyle,
                  backgroundColor: "#ffffff",
                  color: "#3d3d3d",
                  border: "1px solid #d5d5d0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f4f4f0";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                GitHub ↗
              </a>
          )}
        </div>

        {/* Admin */}
        {user?.role === "admin" && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() => onEdit(project)}
              style={{
                padding: "8px 15px",
                border: "none",
                background: "#A3B18A",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(project._id)}
              style={{
                padding: "8px 15px",
                border: "none",
                background: "#c62828",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        )}

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <button
            onClick={() =>
              setCurrentIndex(
                currentIndex === 0
                  ? filteredProjects.length - 1
                  : currentIndex - 1
              )
            }
          >
            ❮
          </button>

          <span>
            {currentIndex + 1} / {filteredProjects.length}
          </span>

          <button
            onClick={() =>
              setCurrentIndex(
                currentIndex === filteredProjects.length - 1
                  ? 0
                  : currentIndex + 1
              )
            }
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}