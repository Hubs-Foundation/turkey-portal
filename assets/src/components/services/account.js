import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),

  endpoints: (builder) => ({
    getAccount: builder.query({ query: () => `account` }),
  }),
});

export const { useGetAccountQuery } = accountApi;
