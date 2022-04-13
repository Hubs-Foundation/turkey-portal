const { addHook } = require("pirates");
const { transform } = require("sucrase");

addHook(
  (code) => {
    // Remove css imports
    code = code.replace(/import\s+['"].+\.css['"]/g, "");

    const { code: compiledCode } = transform(code, { transforms: ["imports", "jsx"] });

    return compiledCode;
  },
  { exts: [".js"] }
);
