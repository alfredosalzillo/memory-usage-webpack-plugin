# memory-usage-webpack-plugin

[![npm version](https://badge.fury.io/js/memory-usage-webpack-plugin.svg)](https://badge.fury.io/js/memory-usage-webpack-plugin)
[![Build Status](https://travis-ci.org/alexandernanberg/memory-usage-webpack-plugin.svg?branch=master)](https://travis-ci.org/alexandernanberg/memory-usage-webpack-plugin)
[![Coverage Status](https://coveralls.io/repos/github/alexandernanberg/memory-usage-webpack-plugin/badge.svg?branch=master)](https://coveralls.io/github/alexandernanberg/memory-usage-webpack-plugin?branch=master)

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

