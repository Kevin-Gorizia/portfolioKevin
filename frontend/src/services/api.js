import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const skillsService = {
  getSkills: () => axios.get(`${API_URL}/api/skills`),
  getProjects: () => axios.get(`${API_URL}/api/projects`),
  getFeaturedProjects: () => axios.get(`${API_URL}/api/projects/featured`),
};
