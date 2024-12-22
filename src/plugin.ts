import type { Compiler } from 'webpack';

const toKB = (bytes: number) => Math.floor(bytes / 1024);
const toMB = (bytes: number) => Math.floor(bytes / 1024 / 1024);
const toGB = (bytes: number) => Math.floor(bytes / 1024 / 1024 / 1024);
const bytesToString = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes}B`;
  }
  if (bytes < 1024 * 1024) {
    return `${toKB(bytes)}KB`;
  }
  if (bytes < 1024 * 1024 * 1024) {
    return `${toMB(bytes)}MB`;
  }
  return `${toGB(bytes)}GB`;
};

type MemoryUsageSample = {
  time: number;
  rss: number;
};
type MemoryUsageWebpackPluginConfig = {
  logTimeout?: number;
  /**
   * Threshold in MB to log a warning message
   */
  warningThreshold?: number;
};
const defaultConfig: Required<MemoryUsageWebpackPluginConfig> = {
  logTimeout: 1000,
  // 1GB
  warningThreshold: 2 * 1024 * 1024 * 1024,
};

class MemoryUsageWebpackPlugin {
  static readonly pluginName = 'MemoryUsageWebpackPlugin';

  private readonly config: Required<MemoryUsageWebpackPluginConfig>;

  constructor(config: MemoryUsageWebpackPluginConfig = defaultConfig) {
    this.config = {
      ...defaultConfig,
      ...config,
    };
  }

  apply(compiler: Compiler) {
    const { pluginName } = MemoryUsageWebpackPlugin;
    const { logTimeout, warningThreshold } = this.config;
    const samples: MemoryUsageSample[] = [];
    const logger = compiler.getInfrastructureLogger(pluginName);
    const logMemoryUsage = () => {
      const { rss } = process.memoryUsage();
      const now = new Date();
      samples.push({
        time: now.getTime(),
        rss,
      });
      logger.debug(
        `RSS Memory: ${bytesToString(rss)}`,
      );
    };
    const start = () => {
      logMemoryUsage();
      const intervalId = setInterval(() => {
        logMemoryUsage();
      }, logTimeout);
      compiler.hooks.done.tap(
        pluginName,
        () => clearInterval(intervalId),
      );
    };

    compiler.hooks.run.tap(
      pluginName,
      start,
    );

    compiler.hooks.done.tap(pluginName, (stats) => {
      const compilationLogger = stats.compilation.getLogger(pluginName);
      const samplesLength = samples.length;
      const avg = samples.reduce((acc, { rss }) => acc + rss, 0) / samplesLength;
      const max = samples.reduce((acc, { rss }) => Math.max(acc, rss), 0);
      const min = samples.reduce((acc, { rss }) => Math.min(acc, rss), Infinity);

      stats.compilation.hooks.statsFactory.tap('MyPlugin', (statsFactory) => {
        statsFactory.hooks.extract
          .for('compilation')
          .tap(pluginName, (object) => {
            // eslint-disable-next-line no-param-reassign
            object.memoryUsage = {
              samples,
              stats: {
                avg,
                max,
                min,
              },
            };
          });
      });

      compilationLogger.info('Memory Usage Stats');
      compilationLogger.info(`Samples: ${samplesLength}`);
      compilationLogger.info(`Average RSS Memory: ${bytesToString(avg)}`);
      compilationLogger.info(`Max RSS Memory: ${bytesToString(max)}`);
      compilationLogger.info(`Min RSS Memory: ${bytesToString(min)}`);
      if (max > warningThreshold) {
        compilationLogger.warn(`Max RSS Memory ${bytesToString(max)} exceeded warning threshold ${bytesToString(warningThreshold)}`);
      }
    });
  }
}

export default MemoryUsageWebpackPlugin;
