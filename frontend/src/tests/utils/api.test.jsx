import { skillsService } from "../../services/api.js";
import { test, expect } from "@jest/globals";

test("fetches projects data from the API", async () => {
  const response = await skillsService.getProjects();
  const data = response.data;

  expect(data).toBeDefined();
  expect(data).toHaveLength(3); // Exemple : vérifier qu'il y a 3 projets
});
