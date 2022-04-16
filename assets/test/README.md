# How the test framework is setup

We use [Jest][jst] as a test runner. Jest also takes care of setting up a test environment with jsdom, transforming code with babel, and it provides assertions and mocking capabilities. We also use [jest-when][jwn] to add mock matching functionality on top of Jest's mocks. 

One quirk of our setup is that we need to ignore CSS imports in our react components, since babel would otherwise attempt to treat them like javascript imports. We do this by specifiying a custom Jest resolver that resolves CSS imports to an empty module.

We use React Router's [`MemoryRouter`][mem] to wrap our React components, and [Testing Library][tsl] to render them. Testing Library also provides a set of helper functions to query into the rendered DOM. Since we use React Toolkit, we need to [polyfill][wgf] additional browser APIs that jsdom does not provide; Namely the Request, Response objects.

The tests also use a set of helpers defined in `test/helpers/setup.js`, which take care of common initialiation tasks, and provide a utility for mocking specific calls to `fetch`. 

[jst]: https://jestjs.io/
[jwn]: https://www.npmjs.com/package/jest-when
[mem]: https://reactrouter.com/docs/en/v6/api#memoryrouter
[tsl]: https://testing-library.com/docs/react-testing-library/intro
[jsd]: https://github.com/jsdom/jsdom
[wgf]: https://www.npmjs.com/package/whatwg-fetch
