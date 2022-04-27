// Polyfill Request and Response
import "whatwg-fetch";

// Override fetch with a mock function that we can manipulate in tests.
global.fetch = jest.fn();
