A note about devDependencies: We use babel in our devDependencies here, but 
it is actually only used by jest, in order to transform the code before running tests.
The source code for the frontend is actually built by esbuild, which is managed by the outer phoenix application.
