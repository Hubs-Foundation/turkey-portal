import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hubsApi = createApi({
  reducerPath: "hubsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  tagTypes: ["Hubs"],

  endpoints: (builder) => ({
    getHubs: builder.query({
      query: () => `hubs`,
      providesTags: ["Hubs"],
    }),

    getHub: builder.query({
      query: ({ hubId }) => `hubs/${hubId}`,
      providesTags: ["Hubs"],
    }),

    updateHub: builder.mutation({
      query: (hub) => ({
        url: `hubs/${hub.hubId}`,
        method: "PATCH",
        body: hub,
      }),
      invalidatesTags: ["Hubs"],
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
