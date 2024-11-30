import axios from "axios";


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});


interface SearchParams {
  page: number;
  s: string; 
  type?: string | null; 
  y?: string | null;
}

interface SearchResponse {
  Response: "True" | "False";
  Search?: Array<{
    imdbID: string;
    Title: string;
    Year: string;
    [key: string]: any;
  }>;
  totalResults?: string;
  Error?: string;
}

interface DetailsResponse {
  imdbID: string;
  Title: string;
  Year: string;
  [key: string]: any;
}


const apiWrapper = {

  getData: async (params: SearchParams): Promise<SearchResponse> => {
    try {
      const response = await apiClient.get<SearchResponse>("/", {
        params: {
          page: params.page,
          apiKey: import.meta.env.VITE_API_KEY,
          s: params.s,
          type: params.type || undefined,
          y: params.y || undefined,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching list data:", error);
      throw error;
    }
  },


  getDetails: async (id: string): Promise<DetailsResponse> => {
    try {
      const response = await apiClient.get<DetailsResponse>(`/data/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching details:", error);
      throw error;
    }
  },
};

export default apiWrapper;
