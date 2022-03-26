import React, { useContext } from "react";

import { FxaUidContext } from "./FxaUidContext";
import { useHubs } from "./hub-hooks";
import { Hub } from "./Hub";

export function HomePage() {
  const fxa_uid = useContext(FxaUidContext);
  const hubs = useHubs(fxa_uid);
  return (
    <>
      {hubs.map((hub) => (
        <Hub key={hub.hub_id} fxa_uid={fxa_uid} {...hub} />
      ))}
    </>
  );
}
