import React from "react";

import { test, render, mockFetch } from "../helpers";
import { App } from "../../src/components/App";

test("App renders an empty page by default", async (t) => {
  mockFetch("/api/v1/hubs", []);
  const screen = render(<App />);
  t.regex(screen.container.textContent, /Turkey/);
});

test("App renders hubs when logged in", async (t) => {
  mockTestAccount();
  mockTestHub();
  const screen = render(<App />, "/");
  t.truthy(await screen.findByText(/Test Hub/));
});

test("App renders hub editor", async (t) => {
  mockTestAccount();
  mockTestHub();
  const screen = render(<App />, "/hubs/1");
  t.truthy(await screen.findByDisplayValue("25"));
});

function mockTestAccount() {
  mockFetch("/api/v1/account", { id: 1 });
}

function mockTestHub() {
  mockFetch("/api/v1/hubs", [
    {
      hub_id: "1",
      name: "Test Hub",
      tier: "premium",
      ccu_limit: 25,
      storage_limit_mb: 50,
    },
  ]);
}
