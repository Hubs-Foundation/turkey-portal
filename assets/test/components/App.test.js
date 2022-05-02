import React from "react";

import { render, mockFetch } from "../helpers/setup";
import { App } from "../../src/components/App";

test("App renders prompt to log in", async () => {
  mockFetch("/api/v1/account", { error: "unauthorized" }, 401);

  const { queryByText } = render(<App />);

  expect(await queryByText("Sign In")).toBeDefined();
});

test("App renders hubs for a logged in user", async () => {
  mockFetch("/api/v1/account", { email: "testuser@example.com" });
  mockFetch("/api/v1/hubs", [
    { hub_id: "1", name: "first hub" },
    { hub_id: "2", name: "second hub" },
  ]);

  const { findByAltText, findByText, findByTitle } = render(<App />);

  expect(await findByAltText("profile picture")).toBeDefined();
  expect(await findByText("first hub")).toBeDefined();
  expect(await findByText("second hub")).toBeDefined();
});
