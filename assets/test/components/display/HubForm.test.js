import React from "react";

import { render } from "../../helpers/setup";
import { HubForm } from "../../../src/components/display/HubForm";

test("Hub form free tier is disabled", async () => {
  const hub = { tier: "premium", ccu_limit: 10, storage_limit_mb: 10 };

  const { findByRole } = render(<HubForm hub={hub} />);

  const freeTier = await findByRole("radio", { name: "free 5 250MB" });
  expect(freeTier.disabled).toBe(true);
});

test("Hub form mvp tier is enabled", async () => {
  const hub = { tier: "premium", ccu_limit: 10, storage_limit_mb: 10 };

  const { findByRole } = render(<HubForm hub={hub} />);

  const freeTier = await findByRole("radio", { name: "mvp 30 2GB" });
  expect(freeTier.disabled).toBe(false);
});
