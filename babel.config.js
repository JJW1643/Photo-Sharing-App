module.exports = function (api) {
  api.cache(true);
  // This is a custom Babel configuration for Expo projects that use NativeWind.
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
