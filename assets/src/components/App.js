import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";

import { store } from "./store/store";
import { FxaUidContext } from "./FxaUidContext";
import { IconLink } from "./common/IconLink";
import { HomeContainer } from "./containers/HomeContainer";
import { HubContainer } from "./containers/HubContainer";
import { Login } from "./display/Login";
import { LoginMessage } from "./common/LoginMessage";

export function App() {
  const fxa_uid = new URLSearchParams(location.search).get("fxa_uid");
  return (
    <FxaUidContext.Provider value={fxa_uid}>
      <StoreProvider store={store}>
        <h1>
          <IconLink to={`/?fxa_uid=${fxa_uid}`} icon="🦃" />
          <Login />
        </h1>
        <Routes>
          {fxa_uid ? (
            <>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/hubs/:hub_id" element={<HubContainer />} />
            </>
          ) : (
            <Route path="*" element={<LoginMessage />} />
          )}
        </Routes>
      </StoreProvider>
    </FxaUidContext.Provider>
  );
}
