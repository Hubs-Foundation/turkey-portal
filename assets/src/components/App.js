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
import { UserNotFound } from "./display/UserNotFound"

export function App() {
  let { account, isLoading, isError, isUnauthorized, isReady } = useAccount();
  const location = useLocation();

  // An error could occur due to several reasons, but let's
  // assume the user just needs to log in again.
  let isLoggedOut = isError;

  // Handle unauthorized email and serve UserNotFoundPage
  if (isUnauthorized) {
    isLoggedOut = false;
    isError = false;
  }

  const title = location.pathname.startsWith("/hubs/") ? "Hub Settings" : "Dashboard";

  return (
    <>
      {isLoading && <Spinner />}
      {isLoggedOut && <Landing />}
      {isUnauthorized && <UserNotFound />}
      {isReady && (
        <Layout
          top={<Header account={account} />}
          nav={<Nav title={title} />}
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
