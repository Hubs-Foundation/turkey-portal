import React from "react";

import { render } from "../../helpers/setup";
import { HubForm } from "../../../src/components/display/HubForm";

test("Hub form free tier is disabled", async () => {
  const hub = { subdomain: "test", tier: "mvp", ccuLimit: 10, storageLimitMb: 10 };

  const { findByRole } = render(<HubForm hub={hub} />);

  const freeTier = await findByRole("radio", { name: "free users 5 storage 250MB" });
  expect(freeTier.disabled).toBe(true);
});

test("Hub form mvp tier is enabled", async () => {
  const hub = { subdomain: "test", tier: "mvp", ccuLimit: 10, storageLimitMb: 10 };

  const { findByRole } = render(<HubForm hub={hub} />);

  const mvpTier = await findByRole("radio", { name: "mvp users - storage -" });
  expect(mvpTier.disabled).toBe(false);
});
