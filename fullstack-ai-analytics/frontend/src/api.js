import axios from "axios";

// Base URL for backend
const BASE_URL = "http://localhost:3000";

const ApiService = {
  uploadDataset: async (file, task) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("task", task);

    const response = await axios.post(`${BASE_URL}/analytics/analyze`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};

export default ApiService;
