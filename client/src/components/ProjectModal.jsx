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
          zIndex: 999,
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
              fontSize: "22px",
              cursor: "pointer",
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
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {/* Category */}
        <p
          style={{
            color: "#777",
            marginBottom: "5px",
          }}
        >
          {category.title}
        </p>

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
            marginTop: "15px",
          }}
        />

        {/* Description */}
        <p
          style={{
            marginTop: "20px",
            lineHeight: "1.7",
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
            >
              Live Demo
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
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
                background: "#6B705C",
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