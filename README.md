# memory-usage-webpack-plugin

[![CD](https://github.com/alfredosalzillo/memory-usage-webpack-plugin/workflows/CD/badge.svg)](https://github.com/alfredosalzillo/memory-usage-webpack-plugin/actions/workflows/CD.yml)
[![CI](https://github.com/alfredosalzillo/memory-usage-webpack-plugin/workflows/CI/badge.svg)](https://github.com/alfredosalzillo/memory-usage-webpack-plugin/actions/workflows/CI.yml)
[![codecov](https://codecov.io/gh/alfredosalzillo/memory-usage-webpack-plugin/branch/main/graph/badge.svg)](https://codecov.io/gh/alfredosalzillo/memory-usage-webpack-plugin)
[![npm version](https://badge.fury.io/js/memory-usage-webpack-plugin.svg)](https://badge.fury.io/js/memory-usage-webpack-plugin)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A webpack plugin to measure memory usage during the build process.

## Installation

Install the plugin.

```sh
npm install memory-usage-webpack-plugin --save-dev
```

## Usage

To use the plugin, add it to your webpack configuration:

```javascript
const MemoryUsageWebpackPlugin = require('memory-usage-webpack-plugin');

module.exports = {
  // ... other configurations
  plugins: [
    new MemoryUsageWebpackPlugin({
      logTimeout: 1000, // 1 second
      warningThreshold: 100 * 1024 * 1024, // 100 MB
    }),
  ],
};
```

## Options

The plugin accepts the following options:
- `logTimeout` (number): The interval in milliseconds to log memory usage. Default: `1000` (1 second).
- `warningThreshold` (number): The memory usage threshold in bytes to trigger a warning. Default: `1 * 1024 * 1024 * 1024` (1GB).

