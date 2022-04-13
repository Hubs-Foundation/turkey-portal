import React from "react";
import { Routes, Route } from "react-router-dom";

import { useAccount } from "./hooks/account";
import { HomeContainer } from "./containers/HomeContainer";
import { HubContainer } from "./containers/HubContainer";
import { LogOut } from "./display/LogOut";
import { LoginMessage } from "./common/LoginMessage";
import { Spinner } from "./common/Spinner";

export function App() {
  const { account, isLoading, isError, isReady } = useAccount();

  return (
    <>
      <h1>
        <a href="/">Turkey</a>
        {isReady && (isError || account?.isLoggedIn) && <LogOut />}
      </h1>
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
                {isError && <span>Unable to retrieve account</span>}
                {isReady && <LoginMessage />}
              </>
            }
          />
        )}
      </Routes>
    </>
  );
}
