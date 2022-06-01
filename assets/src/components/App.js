import React from "react";
import { Routes, Route } from "react-router-dom";

import { useAccount } from "./hooks/account";
import { HomeContainer } from "./containers/HomeContainer";
import { HubContainer } from "./containers/HubContainer";
import { Landing } from "./display/Landing";
import { Spinner } from "./common/Spinner";
import { Layout } from "./display/Layout";
import { ForbiddenWrapper } from "./display/ForbiddenWrapper";

export function App() {
  let { isLoading, isError, isReady } = useAccount();
  // An error could occur due to several reasons, but let's
  // assume the user just needs to log in again.
  let isLoggedOut = isError;

  return (
    <>
      {isLoading && <Spinner />}
      {isLoggedOut && <Landing />}
      {isReady && (
        <Layout>
          <ForbiddenWrapper>
            <Routes>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/hubs/:hubId" element={<HubContainer />} />
            </Routes>
          </ForbiddenWrapper>
        </Layout>
      )}
    </>
  );
}
