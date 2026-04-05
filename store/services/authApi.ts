import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RegisterRequest, RegisterResponse } from "../../types/auth";
import type { RootState } from "../store";

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
  endpoints: (builder) => ({
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
    }),
  }),
});

export const { useRegisterMutation } = authApi;
