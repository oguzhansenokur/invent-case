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
  i?: string | null
  plot?: string
}

export interface SearchResponse {
  Response: "True" | "False";
  Search?: Array<{
    imdbID: string;
    Title: string;
    Year: string;
    [key: string]: string ;
  }>;
  totalResults?: string;
  Error?: string;
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
          i: params.i || undefined,
          plot: params.plot || undefined
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching list data:", error);
      throw error;
    }
  },
};

export default apiWrapper;
