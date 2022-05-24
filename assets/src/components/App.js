import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAccount } from "./hooks/account";
import { HomeContainer } from "./containers/HomeContainer";
import { HubContainer } from "./containers/HubContainer";
import { Landing } from "./display/Landing";
import { Layout } from "./display/Layout";
import { Spinner } from "./common/Spinner";
import { UserNotFound } from "./display/UserNotFound";
// import { selectIsForbidden } from "./store/hubs";

export function App() {
  let { isLoading, isError, isReady } = useAccount();
  const location = useLocation();
  const isForbidden = useSelector((state) => state.hubEntities.isForbidden);

  // An error could occur due to several reasons, but let's
  // assume the user just needs to log in again.
  let isLoggedOut = isError;

  const title = isForbidden ? "" : location.pathname.startsWith("/hubs/") ? "Hub Settings" : "Dashboard";

  return (
    <>
      {isLoading && <Spinner />}
      {isLoggedOut && <Landing />}
      {isReady && (
        <Layout title={title}>
          {isForbidden ? (
            <UserNotFound />
          ) : (
            <Routes>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/hubs/:hubId" element={<HubContainer />} />
            </Routes>
          )}
        </Layout>
      )}
    </>
  );
}
