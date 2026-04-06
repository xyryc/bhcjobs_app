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

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data?: {
    token: string;
  };
}

export interface RegisterResponse {
  status: boolean;
  message?: string;
  token?: string;
  data?: {
    id: number;
    name: string;
    email: string;
    phone: string;
    passport_number: string;
    gender: string;
    dob: string;
    token?: string;
    otp: number;
  };
}

export interface VerifyOTPRequest {
  phone: string;
  otp: string;
}

export interface VerifyOTPResponse {
  status: boolean;
  message: string;
  data?: {
    token: string;
    user_id: number;
    phone: string;
    email: string;
    name: string;
  };
}

export interface ApiErrorResponse {
  status?: boolean;
  message?: string;
  error?: Record<string, string[]>;
}

export interface AuthUser {
  id?: string | number;
  fullName?: string;
  email?: string;
  mobileNumber?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
}
