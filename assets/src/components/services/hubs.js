import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hubsApi = createApi({
  reducerPath: "hubsApi",

  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),

  endpoints: (builder) => ({
    getHubs: builder.query({
      query: () => `hubs`,
    }),

    getHub: builder.query({
      query: ({ hub_id }) => `hubs/${hub_id}`,
      transformResponse: (results) => {
        return addFakeProperties([results])[0];
      },
    }),

    updateHub: builder.mutation({
      query: (hub) => ({
        url: `hubs/${hub.hub_id}`,
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
