import * as path from 'node:path';
import MemoryUsageWebpackPlugin from '../src/plugin';
import webpackAsync from './helpers/webpackAsync';

describe('memory-usage-webpack-plugin', () => {
  it('should add memoryUsage to stats object', async () => {
    const stats = await webpackAsync({
      stats: 'normal',
      mode: 'production',
      entry: path.resolve(__dirname, 'fixtures', 'index.js'),
      output: {
        path: path.resolve(__dirname, 'dist'),
      },
      plugins: [
        new MemoryUsageWebpackPlugin(),
      ],
    });
    expect(stats.toJson().memoryUsage).toBeDefined();
  });
  it('should calculate the minimum memory usage', async () => {
    const stats = await webpackAsync({
      stats: 'normal',
      mode: 'production',
      entry: path.resolve(__dirname, 'fixtures', 'index.js'),
      output: {
        path: path.resolve(__dirname, 'dist'),
      },
      plugins: [
        new MemoryUsageWebpackPlugin(),
      ],
    });
    expect(stats.toJson().memoryUsage.stats.min).toBeDefined();
  });
  it('should calculate the maximum memory usage', async () => {
    const stats = await webpackAsync({
      stats: 'normal',
      mode: 'production',
      entry: path.resolve(__dirname, 'fixtures', 'index.js'),
      output: {
        path: path.resolve(__dirname, 'dist'),
      },
      plugins: [
        new MemoryUsageWebpackPlugin(),
      ],
    });
    expect(stats.toJson().memoryUsage.stats.max).toBeDefined();
  });
  it('should calculate the average memory usage', async () => {
    const stats = await webpackAsync({
      stats: 'normal',
      mode: 'production',
      entry: path.resolve(__dirname, 'fixtures', 'index.js'),
      output: {
        path: path.resolve(__dirname, 'dist'),
      },
      plugins: [
        new MemoryUsageWebpackPlugin(),
      ],
    });
    expect(stats.toJson().memoryUsage.stats.avg).toBeDefined();
  });
  it('should warning if max memory usage is above threshold', async () => {
    const stats = await webpackAsync({
      stats: 'normal',
      mode: 'production',
      entry: path.resolve(__dirname, 'fixtures', 'index.js'),
      output: {
        path: path.resolve(__dirname, 'dist'),
      },
      plugins: [
        new MemoryUsageWebpackPlugin({
          warningThreshold: 0,
        }),
      ],
    });
    const logs = stats.compilation.logging.get(MemoryUsageWebpackPlugin.pluginName);
    expect(logs.some((log) => log.type === 'warn')).toBeTruthy();
  });
});
