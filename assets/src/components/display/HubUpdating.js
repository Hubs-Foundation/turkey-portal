import React from "react";

import { IconClock } from "../common/icons";

export function HubUpdating() {
  return (
    <span className="hub-updating">
      <IconClock />
      Web address changes can take up to 30 seconds to successfully complete.
    </span>
  );
}
