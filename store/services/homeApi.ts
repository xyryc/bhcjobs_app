import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetIndustriesResponse } from "../../types/home";
import type { RootState } from "../store";

export const homeApi = createApi({
  reducerPath: "homeApi",
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
  tagTypes: ["Industry"],
  endpoints: (builder) => ({
    getIndustries: builder.query<GetIndustriesResponse, void>({
      query: () => ({
        url: "/api/industry/get",
        method: "GET",
      }),
      providesTags: ["Industry"],
      transformErrorResponse: (response: { data?: unknown }) =>
        response.data || response,
    }),
  }),
});

export const { useGetIndustriesQuery } = homeApi;
