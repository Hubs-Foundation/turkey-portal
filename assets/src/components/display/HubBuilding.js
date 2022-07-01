import React from "react";

import { IconClock } from "../common/icons";

export function HubBuilding() {
  return (
    <span className="hub-building">
      <IconClock />
      The hub building process can take up to 2 minutes. Your dashboard will automatically refresh once the hub is ready
      to use.
    </span>
  );
}
