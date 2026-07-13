import { useEffect, useState } from "react";

export default function ProjectForm({ onSubmit, close, initialData }) {

  const [form, setForm] = useState({
    title: "",
    category: "",
    thumbnail: "",
    description: "",
    demoUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        category: initialData.category || "",
        thumbnail: initialData.thumbnail || "",
        description: initialData.description || "",
        demoUrl: initialData.demoUrl || "",
        githubUrl: initialData.githubUrl || "",
      });
    }
  }, [initialData]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit(form);

    setForm({
      title: "",
      category: "",
      description: "",
      thumbnail: "",
      demoUrl: "",
      githubUrl: "",
    });
  }

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    fontSize: "15px",
    color: "#3d3d3d",
    backgroundColor: "#FCFBF7",
    border: "1px solid #D8D8D8",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    transition: "0.2s ease",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "500px",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2>{initialData ? "Edit Project" : "Add Project"}</h2>

        <input
          name="title"
          placeholder="Project Name"
          value={form.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
          <option value="">Select Category</option>
          <option value="app">Apps</option>
          <option value="commerce">E-commerce</option>
          <option value="api">API</option>
          <option value="basic">Fundamentals</option>
        </select>

        <input
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Description"
          rows={5}
          value={form.description}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="demoUrl"
          placeholder="Live Demo URL"
          value={form.demoUrl}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          name="githubUrl"
          placeholder="GitHub URL"
          value={form.githubUrl}
          onChange={handleChange}
          style={inputStyle}
        />

        <div style={{ display: "flex", gap: "10px"}}>
          <button type="submit">
            {initialData ? "Update Project" : "Add Project"}
          </button>

          <button type="button" onClick={close}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}