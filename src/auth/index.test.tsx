import { act } from "react-dom/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../test/utils";
import Auth from "./index";

test("renders login form", () => {
  renderWithProviders(<Auth />);
  const emailInput = screen.getByPlaceholderText(/请输入邮箱地址/i);
  expect(emailInput).toBeInTheDocument();
});

test("renders code verifcation form", () => {
  renderWithProviders(<Auth />, {
    preloadedState: {
      auth: { token: "token" },
    },
  });
  const linkElement = screen.getByPlaceholderText(/请输入你的两步验证码/i);
  expect(linkElement).toBeInTheDocument();
});

test("login with correct credentials", async () => {
  const { getByRole, getByLabelText, findByLabelText } = renderWithProviders(
    <Auth />
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
  await act(async () => {
    fireEvent.click(getByRole("button", { name: "下一步" }));
  });

  expect(await findByLabelText("tfa")).toBeInTheDocument();
});

test("login with incorrect credentials", async () => {
  const { getByRole, findByText, getByLabelText } = renderWithProviders(
    <Auth />
  );
  const emailInput = getByLabelText("email");
  const passwordInput = getByLabelText("password");
  await act(async () => {
    fireEvent.change(emailInput, { target: { value: "incorrect@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "incorrect" } });
  });
  expect(getByRole("button", { name: "下一步" })).toHaveProperty(
    "disabled",
    false
  );
  await act(async () => {
    fireEvent.click(getByRole("button", { name: "下一步" }));
  });

  expect(
    await findByText("密码错误或邮箱与对应的密码不相符!")
  ).toBeInTheDocument();
});
