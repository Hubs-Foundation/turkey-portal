import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TODO Remove when the backend actually supplies these values.
function addFakeProperties(hubs) {
  for (const hub of hubs) {
    if (!hub) continue;
    hub.current_ccu = Math.floor(Math.random() * hub.ccu_limit);
    hub.storage_usage_mb = Math.floor(Math.random() * hub.storage_limit_mb);
  }
  return hubs;
}

export const hubsApi = createApi({
  reducerPath: "hubsApi",

  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),

  endpoints: (builder) => ({
    getHubs: builder.query({
      query: () => `hubs`,
      transformResponse: addFakeProperties,
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
