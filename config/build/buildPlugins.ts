import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import webpack, { Configuration, DefinePlugin} from "webpack"
import { BuildOptions } from "./types/types"
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";


export function buildPlugins({mode, paths, analyzer, platform}:BuildOptions): Configuration['plugins'] {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  const plagins:Configuration['plugins'] = [
    new HtmlWebpackPlugin ({ template: paths.html }),
    new DefinePlugin({
      __PLATFORM__:JSON.stringify(platform)
    })
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
 if(analyzer) {
  plagins.push( new BundleAnalyzerPlugin());
 }
return plagins;
}