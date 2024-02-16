import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import webpack, { Configuration  } from "webpack"
import { BuildOptions } from "./types/types"


export function buildPlugins({mode, paths}:BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plagins:Configuration['plugins'] = [
    new HtmlWebpackPlugin ({ template: paths.html }),
    ];

if(isDev){
  plagins.push(new webpack.ProgressPlugin());
}

if(isProd){
  plagins.push(new MiniCssExtractPlugin({
    filename:'css/[name].[contenthash:8].css',
    chunkFilename: 'css/[name].[contenthash:8]css',
  }));
};

return plagins;
}