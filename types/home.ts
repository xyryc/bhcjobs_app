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

export interface Company {
  id: number;
  name: string;
  is_active: number;
  slug: string;
  image: string;
  jobs_count: number;
}

export interface GetCompaniesResponse {
  status: boolean;
  message: string;
  data: Company[];
}
