import React from "react";
import { Routes, Route } from "react-router-dom";

import { useAccount } from "./hooks/account";
import { HomeContainer } from "./containers/HomeContainer";
import { HubContainer } from "./containers/HubContainer";
import { Header } from "./display/Header";
import { LoginMessage } from "./common/LoginMessage";
import { Spinner } from "./common/Spinner";

export function App() {
  const { account, isLoading, isError, isReady } = useAccount();

  // An error could occur due to several reasons, but let's
  // assume the user just needs to log in again.
  const isLoggedOut = isError;

  return (
    <>
      <Header account={account} />
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
    </>
  );
}
