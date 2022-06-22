import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hubsApi = createApi({
  reducerPath: "hubsApi",

  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),

  endpoints: (builder) => ({
    getHubs: builder.query({
      query: () => `hubs`,
    }),

    getHub: builder.query({
      query: ({ hubId }) => `hubs/${hubId}`,
    }),

    updateHub: builder.mutation({
      query: (hub) => ({
        url: `hubs/${hub.hubId}`,
        method: "PATCH",
        body: hub,
      }),
    }),

    createHub: builder.mutation({
      query: () => ({
        url: `hubs`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetHubsQuery, useGetHubQuery, useUpdateHubMutation, useCreateHubMutation } = hubsApi;
