import reducer, { setToken } from "./slice";

test("should return the initial state", () => {
  expect(reducer(undefined, { type: undefined })).toEqual({ token: undefined });
});

test("should handle set token", () => {
  const previousState = { token: undefined };
  const token = "token";
  expect(reducer(previousState, setToken(token))).toEqual({ token });
});
