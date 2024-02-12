import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAdditionalHeaders } from "./getAdditionalHeaders";
import { getToken } from "./getToken";

export const dashCountApi = createApi({
  reducerPath: "dashCountApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://knprkadmnbknd.koinpark.com" }),
  endpoints: (builder) => ({
    getCount: builder.query({
      query: () => ({
        url: "admin/dashboard_pending_counts",
        headers: {
        
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),
    getPending: builder.query({
      query: () => ({
        url: "count_detail/get_developer_dashboard",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetCountQuery, useGetPendingQuery } = dashCountApi;
