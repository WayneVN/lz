import { act } from "react-dom/test-utils";
import { fireEvent } from "@testing-library/react";
import { renderWithProviders } from "../../test/utils";
import CodeVerifyCation from "./code-verification";

test("with valid code", async () => {
  const { getByRole, getByLabelText } = renderWithProviders(
    <CodeVerifyCation />
  );
  const tfaInput = getByLabelText("tfa");
  await act(async () => {
    fireEvent.change(tfaInput, { target: { value: "12312" } });
  });
  expect(getByRole("button", { name: "确定" })).toHaveProperty(
    "disabled",
    false
  );
});

test("with empty code", async () => {
  const { getByRole, findByText, getByLabelText } = renderWithProviders(
    <CodeVerifyCation />
  );
  await act(async () => {
    fireEvent.change(getByLabelText("tfa"), { target: { value: "" } });
  });
  expect(getByRole("button", { name: "确定" })).toHaveProperty(
    "disabled",
    true
  );
});
