import { Configuration } from 'webpack';
import { BuildOptions } from './types/types';

export function buildResolves(option:BuildOptions):Configuration['resolve'] {
return {
    extensions: ['.tsx', '.ts', '.js'],
  }
}