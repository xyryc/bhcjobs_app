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

export interface JobCountry {
  id: number;
  name: string;
}

export interface JobCompany {
  id: number;
  image: string;
}

export interface Job {
  id: number;
  job_title: string;
  company_name: string;
  salary_type?: string | null;
  currency?: string | null;
  min_salary?: number | null;
  max_salary?: number | null;
  food_option?: string | null;
  food_amount?: number | null;
  type?: string | null;
  country?: JobCountry | null;
  company?: JobCompany | null;
}

export interface GetJobsResponse {
  status: boolean;
  message: string;
  data: Job[];
}
