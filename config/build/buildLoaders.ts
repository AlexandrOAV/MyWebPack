import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";


export function  buildLoaders(option:BuildOptions):ModuleOptions['rules'] {
    const isDev = option.mode === 'development';

    const cssLoaderWithModules = {
      loader: "css-loader",
      options: {
          modules: {
              localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
          },
      },
  }

  

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
        // Creates `style` nodes from JS strings
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        // Translates CSS into CommonJS
        cssLoaderWithModules,
        // Compiles Sass to CSS
        "sass-loader",
    ],
}

      const tsLoader =  {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
return [scssLoader, tsLoader]
//ts-loader вміє працювати з LSX // Упорядкування важливе//як би не використовувася TS, то потрібен був би babel-loader 
  
}