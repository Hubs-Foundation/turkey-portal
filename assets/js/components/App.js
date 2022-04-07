import React from "react";
import { Routes, Route } from "react-router-dom";

import { FxaUidContext } from "./FxaUidContext";
import { IconLink } from "./IconLink";
import { HomePage } from "./HomePage";
import { HubPage } from "./HubPage";
import { Login } from "./Login";
import { LoginMessage } from "./LoginMessage";

export function App() {
  const fxa_uid = new URLSearchParams(location.search).get("fxa_uid");
  return (
    <FxaUidContext.Provider value={fxa_uid}>
      <h1>
        <IconLink to={`/?fxa_uid=${fxa_uid}`} icon="🦃" />
        <Login />
      </h1>
      <Routes>
        {fxa_uid ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/hubs/:hub_id" element={<HubPage />} />
          </>
        ) : (
          <Route path="*" element={<LoginMessage />} />
        )}
      </Routes>
    </FxaUidContext.Provider>
  );
}
