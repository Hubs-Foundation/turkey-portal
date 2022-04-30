import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { useAccount } from "./hooks/account";
import { HomeContainer } from "./containers/HomeContainer";
import { HubContainer } from "./containers/HubContainer";
import { Layout } from "./display/Layout";
import { Header } from "./display/Header";
import { Nav } from "./display/Nav";
import { LoginMessage } from "./common/LoginMessage";
import { Spinner } from "./common/Spinner";

export function App() {
  const { account, isLoading, isError, isReady } = useAccount();
  const location = useLocation();

  // An error could occur due to several reasons, but let's
  // assume the user just needs to log in again.
  const isLoggedOut = isError;

  const title = location.pathname.startsWith("/hubs/") ? "Hub Settings" : "Dashboard"

  return (
    <>
      <Layout
        top={<Header account={account} />}
        nav={<Nav title={title} />}
        content={
          <Routes>
            {isReady && account?.isLoggedIn ? (
              <>
                <Route path="/" element={<HomeContainer />} />
                <Route path="/hubs/:hub_id" element={<HubContainer />} />
              </>
            ) : (
              <Route
                path="*"
                element={
                  <>
                    {isLoading && <Spinner />}
                    {isLoggedOut && <LoginMessage />}
                  </>
                }
              />
            )}
          </Routes>
        }
      />
    </>
  );
}
