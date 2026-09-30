import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Mock data to simulate comments
const MOCK_COMMENTS = [
  {
    id: 1,
    text: "This is a root comment",
    replies: [
      {
        id: 2,
        text: "This is a reply to the root",
        replies: [
          {
            id: 3,
            text: "Deeply nested reply!",
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 4,
    text: "Another root comment",
    replies: []
  }
];

export const advancedApi = createApi({
  reducerPath: 'advancedApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getComments: builder.query({
      queryFn: async () => {
        // Simulate a slow network request
        await new Promise(resolve => setTimeout(resolve, 800));
        return { data: MOCK_COMMENTS };
      }
    })
  })
});

export const { useGetCommentsQuery } = advancedApi;
