export interface LoginFormData {
  mobileNumber: string;
  password: string;
}

export interface LoginFormErrors {
  mobileNumber?: string;
  password?: string;
}

export interface RegisterFormData {
  fullName: string;
  mobileNumber: string;
  dateOfBirth: Date | null;
  passportNo: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterFormErrors {
  fullName?: string;
  mobileNumber?: string;
  dateOfBirth?: string;
  passportNo?: string;
  gender?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}
