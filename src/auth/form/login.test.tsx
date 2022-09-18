import { act } from "react-dom/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test/utils";
import Login from "./login";

test("with valid credentials", async () => {
  const { getByRole, getByLabelText, findByLabelText } = renderWithProviders(
    <Login />
  );
  const emailInput = getByLabelText("email");
  const passwordInput = getByLabelText("password");
  await act(async () => {
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
  });
  expect(getByRole("button", { name: "下一步" })).toHaveProperty(
    "disabled",
    false
  );
});

test("with invalid inputs", async () => {
  const { getByRole, findByText, getByLabelText } = renderWithProviders(
    <Login />
  );
  const emailInput = getByLabelText("email");
  const passwordInput = getByLabelText("password");
  await act(async () => {
    fireEvent.change(emailInput, { target: { value: "incorrect" } });
    fireEvent.change(passwordInput, { target: { value: "12312" } });
  });
  expect(await findByText("邮箱格式错误，请重新输入!")).toBeInTheDocument();
  expect(await findByText("密码长度8～32位!")).toBeInTheDocument();
  expect(getByRole("button", { name: "下一步" })).toHaveProperty(
    "disabled",
    true
  );
});
