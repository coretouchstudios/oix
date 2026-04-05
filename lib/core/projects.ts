export function getProjects(userId: string) {
  const key = `oix_projects_${userId}`;
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function createProject(userId: string, name: string) {
  const key = `oix_projects_${userId}`;
  const projects = JSON.parse(localStorage.getItem(key) || "[]");

  const newProject = {
    id: Date.now(),
    name,
    createdAt: new Date().toISOString(),
  };

  projects.unshift(newProject);

  localStorage.setItem(key, JSON.stringify(projects));

  return newProject;
}