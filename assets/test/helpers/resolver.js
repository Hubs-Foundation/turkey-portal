module.exports = function resolver(path, options) {
  if (path.endsWith(".png") || path.endsWith(".svg") || path.endsWith(".css")) {
    return `${options.rootDir}/test/helpers/empty-module.js`;
  } else {
    return options.defaultResolver(path, options);
  }
};
