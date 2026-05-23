import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),

  endpoints: (builder) => ({

  uploadPdf: builder.mutation({
    query: ({ file, sessionId }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
        url: `/upload?session_id=${sessionId}`,
        method: "POST",
        body: formData,
        };
       },
    }),

    }),
 });

export const {
  useUploadPdfMutation,
} = api;