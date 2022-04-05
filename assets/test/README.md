# How the test framework is setup

We use [Ava][ava] as a test runner. Ava is configured to require two node hooks in `package.json`. The first is [Sucrase][suc] which transforms all test code and imports into es6, including JSX transforms. The second is [global-jsdom][gjd], which adds browser globals required by react-dom to the node.js context.

We use React Router's [`MemoryRouter`][mem] to wrap our React components, and [Testing Library][tsl] to render them. Testing Library also provides a set of helper functions to query into the rendered DOM. We create a new, isolated [JSDOM][jsd] instance every time we render a component, to ensure that they are isolated.

Tests also use a set of helpers defined in `test/helpers/index.js`, which take care of common initialiation and cleanup tasks, and provide a simple `fetch` mock utility.

Tests are currently run serially with Ava's `--serial` flag, since `@testing-library/react` doesn't seem to like the way we're querying the rendered DOM.

[ava]: https://github.com/avajs/ava
[suc]: https://github.com/alangpierce/sucrase
[gjd]: https://github.com/modosc/global-jsdom
[mem]: https://reactrouter.com/docs/en/v6/api#memoryrouter
[tsl]: https://testing-library.com/docs/react-testing-library/intro
[jsd]: https://github.com/jsdom/jsdom
