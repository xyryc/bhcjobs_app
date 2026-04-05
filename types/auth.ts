export interface RegisterRequest {
  name: string;
  phone: string;
  dob: string;
  passport_number: string;
  gender: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface RegisterResponse {
  status: boolean;
  message?: string;
  data?: {
    id: number;
    email: string;
    phone: string;
    otp: number;
  };
}

export interface ApiErrorResponse {
  status?: boolean;
  message?: string;
  error?: Record<string, string[]>;
}

export interface AuthUser {
  id?: string;
  fullName?: string;
  email?: string;
  mobileNumber?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
}
