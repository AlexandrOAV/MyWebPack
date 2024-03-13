import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from 'react-refresh-typescript';


export function  buildLoaders(option:BuildOptions):ModuleOptions['rules'] {
    const isDev = option.mode === 'development';

const assetLoader =   {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  };

const svgrLoader =  {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [{ loader: '@svgr/webpack', 
            options: { 
                icon: true,
                svgoConfig: {
                    plugins: [
                        {
                            name: 'convertColors',
                            params: {
                                currentColor: true,
                            }
                        }
                    ]
                }
            } }],
  };

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
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              /**Щоб не перезавантажувалось при зміні коду */
              getCustomTransformers: () => ({
                before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
              }),
            }
          }
        ]
      }
        
const babelLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env', 
                  "@babel/preset-typescript", 
                  ["@babel/preset-react",  {runtime: isDev ? "automatic" : "classic"}]
        ]
      }
    }
  }     


return [
    assetLoader, 
    scssLoader,
    // tsLoader,
    svgrLoader,
    babelLoader
]

//ts-loader вміє працювати з LSX // Упорядкування важливе//як би не використовувася TS, то потрібен був би babel-loader 
  
}