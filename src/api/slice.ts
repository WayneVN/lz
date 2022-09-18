import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { State } from "../store";

const baseUrl = "https://gateway.lizhi.io/demo/";

const api = createApi({
  reducerPath: "api",
  endpoints: (builder) => ({}),
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as State).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
});

export const { middleware, injectEndpoints } = api;

export default api.reducer;
