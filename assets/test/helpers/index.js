import React from "react";
import test from "ava";
import { MemoryRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import { render as testingLibraryRender } from "@testing-library/react";
import { JSDOM } from "jsdom";

import { store } from "../../src/components/store/store";

function navigateGlobalJsdom(path) {
  global.$jsdom.reconfigure({ url: `http://test.local${path}` });
}

function render(children, path = "/") {
  const dom = new JSDOM(`<div id="root"></div>`);
  const root = dom.window.document.getElementById("root");
  navigateGlobalJsdom(path);
  return testingLibraryRender(
    <MemoryRouter initialEntries={[path]}>
      <StoreProvider store={store}>{children}</StoreProvider>
    </MemoryRouter>,
    { container: root }
  );
}

let fetchHandlers = new Map();

function mockFetch(url, response) {
  fetchHandlers.set(url, response);
}

global.Request = class Request {
  constructor(url) {
    this.url = url;
  }
  clone() {
    return new global.Request(this.url);
  }
};

global.fetch = (urlOrRequest) => {
  let url = urlOrRequest;
  if (urlOrRequest.url) url = urlOrRequest.url;

  if (!fetchHandlers.has(url)) throw new Error(`No fetch mock registered for ${url}`);

  const response = {
    status: 200,
    text: () => Promise.resolve(JSON.stringify(fetchHandlers.get(url))),
    json: () => fetchHandlers.get(url),
  };

  response.clone = () => response;

  return Promise.resolve(response);
};

test.afterEach.always(() => {
  navigateGlobalJsdom("/");
  fetchHandlers.clear();
});

export { test, render, mockFetch };
