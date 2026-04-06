import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyOTPRequest,
  VerifyOTPResponse,
} from "../../types/auth";
import type { RootState } from "../store";

export interface RegisterErrorResponse {
  status: false;
  message?: string;
  error?: Record<string, string[]>;
}

export interface LoginErrorResponse {
  status: false;
  message?: string;
  error?: Record<string, string[]>;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => {
        const formData = new FormData();
        formData.append("phone", data.phone);
        formData.append("password", data.password);

        return {
          url: "/api/job_seeker/login",
          method: "POST",
          body: formData,
        };
      },
      transformErrorResponse: (response: { data?: unknown }) =>
        response.data || response,
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => {
        const formData = new FormData();
        formData.append("name", credentials.name);
        formData.append("phone", credentials.phone);
        formData.append("email", credentials.email);
        formData.append("password", credentials.password);
        formData.append("confirm_password", credentials.confirm_password);
        formData.append("passport_number", credentials.passport_number);
        formData.append("dob", credentials.dob);
        formData.append("gender", credentials.gender);

        return {
          url: "/api/job_seeker/register",
          method: "POST",
          body: formData,
        };
      },
      transformErrorResponse: (response: { data?: unknown }) =>
        response.data || response,
    }),
    verifyOTP: builder.mutation<VerifyOTPResponse, VerifyOTPRequest>({
      query: (data) => {
        const formData = new FormData();
        formData.append("phone", data.phone);
        formData.append("otp", data.otp);

        return {
          url: "/api/job_seeker/phone_verify",
          method: "POST",
          body: formData,
        };
      },
      transformErrorResponse: (response: { data?: unknown }) =>
        response.data || response,
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyOTPMutation } =
  authApi;
