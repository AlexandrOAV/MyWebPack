import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";


export function  buildLoaders(option:BuildOptions):ModuleOptions['rules'] {
    const isDev = option.mode === 'development';

    const sccsLoader = {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      }

      const tsLoader =  {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
return [sccsLoader, tsLoader]
//ts-loader вміє працювати з LSX // Упорядкування важливе//як би не використовувася TS, то потрібен був би babel-loader 
  
}