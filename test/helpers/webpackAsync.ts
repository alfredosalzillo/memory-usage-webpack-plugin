import { promisify } from 'node:util';
import { webpack, Configuration, Stats } from 'webpack';

const webpackAsync = promisify<
Configuration, Stats | undefined
>((config, callback) => webpack(config, callback));

export default webpackAsync;
