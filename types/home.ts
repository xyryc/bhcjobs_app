export interface Industry {
  id: number;
  priority: number;
  name: string;
  is_active: number;
  image: string;
  jobs_count: number;
}

export interface GetIndustriesResponse {
  status: boolean;
  message: string;
  data: Industry[];
}
