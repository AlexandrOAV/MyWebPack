import webpack from "webpack";
import { buildDevServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolves } from "./buildResolves";
import { BuildOptions } from "./types/types";

export function buildWebpack(option:BuildOptions):webpack.Configuration {

  const {mode, paths } = option;
  const isDev = option.mode === 'development';
  return {
    mode: mode ?? 'development',

    entry: paths.entry,

    output: {
        path: paths.output,
        filename: '[name].[contenthash].js',
        clean:true,
    },

    plugins: buildPlugins(option),

    module: {
        rules: buildLoaders(option),
          },

        resolve: buildResolves(option),

    devServer: isDev ? buildDevServer(option): undefined,
    devtool: isDev ? 'inline-source-map' : false,

  };
};