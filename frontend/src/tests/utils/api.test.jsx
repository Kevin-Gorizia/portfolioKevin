// src/tests/utils/api.test.jsx
import { skillsService } from "../../services/api.js";
import axios from "axios";

jest.mock("axios");

test("fetches projects data from the API", async () => {
  // arrange : mock axios.get pour retourner une response similaire à axios
  const fakeData = [{ id: 1 }, { id: 2 }, { id: 3 }];
  axios.get.mockResolvedValue({ data: fakeData });

  const response = await skillsService.getProjects();
  expect(response.data).toBeDefined();
  expect(response.data).toHaveLength(3);
});
