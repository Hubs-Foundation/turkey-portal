import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { useAccount } from "./hooks/account";
import { HomeContainer } from "./containers/HomeContainer";
import { HubContainer } from "./containers/HubContainer";
import { Landing } from "./display/Landing";
import { Layout } from "./display/Layout";
import { Header } from "./display/Header";
import { Nav } from "./display/Nav";
import { Spinner } from "./common/Spinner";

export function App() {
  const { account, isLoading, isError, isReady } = useAccount();
  const location = useLocation();

  // An error could occur due to several reasons, but let's
  // assume the user just needs to log in again.
  const isLoggedOut = isError;

  const isHubSettings = location.pathname.startsWith("/hubs/");
  const title = isHubSettings ? "Hub Settings" : "Dashboard";

  return (
    <>
      {isLoading && <Spinner />}
      {isLoggedOut && <Landing />}
      {isReady && (
        <Layout
          top={<Header account={account} />}
          nav={<Nav title={title} showBackButton={isHubSettings} />}
          content={
            <Routes>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/hubs/:hubId" element={<HubContainer />} />
            </Routes>
          }
        />
      )}
    </>
  );
}
