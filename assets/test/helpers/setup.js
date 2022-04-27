import React from "react";
import { render as testingLibraryRender } from "@testing-library/react";
import { when } from "jest-when";
import { Provider as StoreProvider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import "./global-fetch";
import { store } from "../../src/components/store/store";

function render(children) {
  return testingLibraryRender(
    <MemoryRouter initialEntries={["/"]}>
      <StoreProvider store={store}>{children}</StoreProvider>
    </MemoryRouter>
  );
}

function mockFetch(url, response, status = 200) {
  when(global.fetch)
    .calledWith(expect.objectContaining({ url }))
    .mockResolvedValue(new Response(JSON.stringify(response), { status }));
}

export { render, mockFetch };
