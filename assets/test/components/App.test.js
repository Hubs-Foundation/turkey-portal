import React from "react";

import { test, render, mockFetch } from "../helpers";
import { App } from "../../js/components/App";

test("App renders an empty page by default", async (t) => {
  mockFetch("/api/v1/hubs?fxa_uid=null", []);
  const screen = render(<App />);
  t.is(screen.container.textContent, "🦃");
});

test("App renders hubs when logged in", async (t) => {
  mockTestHub();
  const screen = render(<App />, "/?fxa_uid=test_user");
  t.truthy(await screen.findByText(/Test Hub/));
});

test("App renders hub editor", async (t) => {
  mockTestHub();
  const screen = render(<App />, "/hubs/1?fxa_uid=test_user");
  t.truthy(await screen.findByDisplayValue("25"));
});

function mockTestHub() {
  mockFetch("/api/v1/hubs?fxa_uid=test_user", [
    {
      hub_id: 1,
      name: "Test Hub",
      tier: "premium",
      ccu_limit: 25,
      storage_limit_mb: 50,
    },
  ]);
}
