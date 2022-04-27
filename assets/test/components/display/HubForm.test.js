import React from "react";

import { render } from "../../helpers/setup";
import { HubForm } from "../../../src/components/display/HubForm";

test("Hub form enables options for premium tier", async () => {
  const hub = { tier: "premium", ccu_limit: 10, storage_limit_mb: 10 };

  const { findByRole } = render(<HubForm hub={hub} />);

  const fiveGigStorage = await findByRole("radio", { name: "5,000" });
  expect(fiveGigStorage.disabled).toBe(false);
  const fiftyCcu = await findByRole("radio", { name: "50" });
  expect(fiftyCcu.disabled).toBe(false);
});

test("Hub form disables storage options for free tier", async () => {
  const hub = { tier: "free" };

  const { findByRole } = render(<HubForm hub={hub} />);

  const fiveGigStorage = await findByRole("radio", { name: "5,000" });
  expect(fiveGigStorage.disabled).toBe(true);
  const fiftyCcu = await findByRole("radio", { name: "50" });
  expect(fiftyCcu.disabled).toBe(true);
});

test("Hub form disables storage options lower than usage", async () => {
  const hub = { tier: "premium", ccu_limit: 10, storage_limit_mb: 10000, storage_usage_mb: 6000 };

  const { findByRole, findByText } = render(<HubForm hub={hub} />);

  const fiveGigStorage = await findByRole("radio", { name: "5,000" });
  expect(fiveGigStorage.disabled).toBe(true);
  expect(await findByText(/cannot choose storage/)).toBeDefined();
});
