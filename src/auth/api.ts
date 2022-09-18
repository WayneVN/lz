import { injectEndpoints } from "../api/slice";
import { setToken } from "./slice";

export type Response = {
  status: number;
  message?: string;
};

export type LoginResponse = Response & { token: string };

export type LoginInput = {
  email: string;
  password: string;
};

export type VerifyCodeInput = {
  tfa: string;
};

export const authApi = injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginInput>({
      query: (body) => ({
        url: "login.php?phase=1",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        if (data.token) {
          dispatch(setToken(data.token));
        }
      },
    }),
    verifyCode: builder.mutation<Response, VerifyCodeInput>({
      query: (body) => ({
        url: "verifyCode.php?phase=2",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useVerifyCodeMutation } = authApi;
