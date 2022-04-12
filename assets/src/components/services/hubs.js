import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TODO Remove when the backend actually supplies these values.
function addFakeProperties(hubs) {
  for (const hub of hubs) {
    hub.current_ccu = Math.floor(Math.random() * hub.ccu_limit);
    hub.storage_usage_mb = Math.floor(Math.random() * hub.storage_limit_mb);
  }
  return hubs;
}

export const hubsApi = createApi({
  reducerPath: 'hubsApi',

  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/' }),

  endpoints: (builder) => ({
    getHubs: builder.query({
      query: ({fxa_uid}) => `hubs?fxa_uid=${fxa_uid}`,
      transformResponse: addFakeProperties,
    }),

    getHub: builder.query({
      query: ({fxa_uid}) => `hubs?fxa_uid=${fxa_uid}`,
      transformResponse: (results, meta, args) => {
        // TODO Remove this when we have a backend API to retrieve a single hub.
        return addFakeProperties(results).find(hub => hub.hub_id.toString() === args.hub_id);
      },
    }),

    updateHub: builder.mutation({
      query: ({fxa_uid, hub_id, hub}) => ({
        url: `hubs/${hub_id}?fxa_uid=${fxa_uid}`,
        method: 'PATCH',
        body: hub
      }),
    })
  })
});

export const { useGetHubsQuery, useGetHubQuery, useUpdateHubMutation } = hubsApi;
