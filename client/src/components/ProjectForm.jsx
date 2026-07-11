import { useEffect, useState } from "react";

export default function ProjectForm({ onSubmit, close, initialData }) {

  const [form, setForm] = useState({
    title: "",
    category: "page",
    thumbnail: "",
    description: "",
    demoUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        category: initialData.category || "page",
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
      category: "page",
      description: "",
      thumbnail: "",
      demoUrl: "",
      githubUrl: "",
    });
  }

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
        />

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="page">Page Design</option>
          <option value="ui">UI</option>
          <option value="app">App</option>
          <option value="api">API</option>
        </select>

        <input
          name="thumbnail"
          placeholder="Thumbnail URL"
          value={form.thumbnail}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          rows={5}
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          name="demoUrl"
          placeholder="Live Demo URL"
          value={form.demoUrl}
          onChange={handleChange}
        />

        <input
          name="githubUrl"
          placeholder="GitHub URL"
          value={form.githubUrl}
          onChange={handleChange}
        />

        <div style={{ display: "flex", gap: "10px" }}>
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