import axios from "axios";


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

const apiWrapper = {
  getData: async ({ page, pageSize, sortField, sortOrder, filter ,s}) => {
    try {
      const response = await apiClient.get("/", {
        params: {
          page,
          pageSize,
          sortField,
          sortOrder,
          filter,
          apiKey: import.meta.env.VITE_API_KEY,
          s
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching list data:", error);
      throw error;
    }
  },

  getDetails: async (id) => {
    try {
      const response = await apiClient.get(`/data/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching details:", error);
      throw error;
    }
  },
};

export default apiWrapper;
