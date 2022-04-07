import React from "react";
import test from "ava";
import { MemoryRouter } from "react-router-dom";
import { render as testingLibraryRender } from "@testing-library/react";
import { JSDOM } from "jsdom";

function navigateGlobalJsdom(path) {
  global.$jsdom.reconfigure({ url: `http://test.local${path}` });
}

function render(children, path = "/") {
  const dom = new JSDOM(`<div id="root"></div>`);
  const root = dom.window.document.getElementById("root");
  navigateGlobalJsdom(path);
  return testingLibraryRender(<MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>, { container: root });
}

let fetchHandlers = new Map();

function mockFetch(url, response) {
  fetchHandlers.set(url, response);
}

global.fetch = (url) => {
  if (!fetchHandlers.has(url)) throw new Error(`No fetch mock registered for ${url}`);
  return Promise.resolve({ json: () => fetchHandlers.get(url) });
};

test.afterEach.always(() => {
  navigateGlobalJsdom("/");
  fetchHandlers.clear();
});

export { test, render, mockFetch };
