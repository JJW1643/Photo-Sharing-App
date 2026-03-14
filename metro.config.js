// Learn more https://docs.expo.io/guides/customizing-metro

// This is a custom Metro configuration for Expo projects that use NativeWind.
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// This is a custom Metro configuration for Expo projects that use NativeWind.
module.exports = withNativeWind(config, { input: './global.css' });
