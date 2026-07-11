import ProjectForm from "../components/ProjectForm";
import api from "../api";

export default function AdminProjects() {

  async function addProject(project) {

    try {

      await api.post("/api/projects", project);

      alert("Project added");

    } catch (err) {

      console.log(err);

      alert("Failed");

    }

  }

  return (
    <div>

      <h1>Project Manager</h1>

      <ProjectForm
        onSubmit={addProject}
      />

    </div>
  );
}