import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api";

import CategoryCard from "../components/CategoryCard";
import ProjectModal from "../components/ProjectModal";
import ProjectForm from "../components/ProjectForm";

import Lottie from "lottie-react";
import projectAnimation from "../assets/lottie/Deep Work Illustration Loop.json";

export default function Projects() {
  const { user } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await api.get("/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("프로젝트 불러오기 실패:", err.response?.data || err);
      }
    }

    if (user) {
      loadProjects();
    }
  }, [user]);

  const handleAddProject = async (data) => {
    try {
      console.log("추가할 프로젝트:", data);

      const res = await api.post("/api/projects", data);

      setProjects((prev) => [...prev, res.data]);
      setShowForm(false);
    } catch (err) {
      console.error("프로젝트 추가 실패:", err.response?.data || err);
    }
  };

  const handleUpdateProject = async (data) => {
    if (!editingProject?._id) return;

    try {
      const res = await api.put(
        `/api/projects/${editingProject._id}`,
        data
      );

      setProjects((prev) =>
        prev.map((project) =>
          project._id === editingProject._id ? res.data : project
        )
      );

      setEditingProject(null);
      setShowForm(false);
    } catch (err) {
      console.error("프로젝트 수정 실패:", err.response?.data || err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/projects/${id}`);

      setProjects((prev) =>
        prev.filter((project) => project._id !== id)
      );

      setSelectedCategory(null);
    } catch (err) {
      console.error("프로젝트 삭제 실패:", err.response?.data || err);
    }
  };

  const categories = [
    { id: "page", title: "Page Design" },
    { id: "ui", title: "UI" },
    { id: "app", title: "App" },
    { id: "api", title: "API" },
  ];

  if (!user) {
    return (
      <div style={{ paddingTop: '150px', textAlign: "center" }}>
        <h2>You must be signed in to view the projects</h2>
        <p>
          ⚠️ 회원가입 후 로그인하시면 제가 개발한 다양한 프로젝트들을
          둘러보실 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          height: "300px",
          // marginTop: '-60px',
          paddingTop: '70px',
          color: "#fff",
          background: "linear-gradient(135deg, #6B705C, #A5A58D)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            height: "100%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ marginTop: "-120px", marginLeft: "40px" }}>
            <h1>My Project</h1>
            <p>Explore the technologies I use to build modern web applications.</p>
          </div>

          <Lottie
            animationData={projectAnimation}
            loop
            style={{
              width: "250px",
              marginRight: "50px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "100px 0",
          backgroundColor: '#FAF8E6'
        }}
      >
        {user.role === "admin" && (
          <button
            onClick={() => {
              setEditingProject(null);
              setShowForm(true);
            }}
            style={{
              padding: "12px 20px",
              margin: "20px 0",
              background: "#6B705C",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            + Add Project
          </button>
        )}

        <h3>Showcase</h3>

        <div
          style={{
            maxWidth: "1200px",
            margin: "auto",
            overflow: "hidden",
          }}
        >
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        category={selectedCategory}
        projects={projects}
        close={() => setSelectedCategory(null)}
        user={user}
        onDelete={handleDelete}
        onEdit={(project) => {
          setEditingProject(project);
          setShowForm(true);
        }}
      />

      {showForm && (
        <ProjectForm
          close={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
          initialData={editingProject}
          onSubmit={
            editingProject ? handleUpdateProject : handleAddProject
          }
        />
      )}

      {/* FOOTER */}
      <div style={{ textAlign: 'center', fontSize: '20px', padding: '20px' }}>
        © Lorem ipsum
      </div>
    </>
  );
}