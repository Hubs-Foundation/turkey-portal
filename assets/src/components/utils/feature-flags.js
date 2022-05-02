/* global global */
const NODE_ENV = typeof global !== "undefined" && global.process.env.NODE_ENV;
const FEATURE_FLAGS = window.FEATURE_FLAGS || {};

const TIER_SELECTION = "tierSelection";
const CCU_SELECTION = "ccuSelection";
const STORAGE_SELECTION = "storageSelection";
const CREATE_HUBS = "createHubs";

function featureIsEnabled(flag) {
  if (NODE_ENV === "test") return true;
  return !!FEATURE_FLAGS[flag];
}

export { featureIsEnabled, TIER_SELECTION, CCU_SELECTION, STORAGE_SELECTION, CREATE_HUBS };
