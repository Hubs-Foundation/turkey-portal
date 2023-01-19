import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const HUBS_TAG = "Hubs";

export const hubsApi = createApi({
  reducerPath: "hubsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  tagTypes: [HUBS_TAG],

  endpoints: (builder) => ({
    getHubs: builder.query({
      query: () => `hubs`,
      providesTags: [HUBS_TAG],
    }),

    getHub: builder.query({
      query: ({ hubId }) => `hubs/${hubId}`,
      providesTags: [HUBS_TAG],
    }),

    updateHub: builder.mutation({
      query: (hub) => ({
        url: `hubs/${hub.hubId}`,
        method: "PATCH",
        body: hub,
      }),
      invalidatesTags: [HUBS_TAG],
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
