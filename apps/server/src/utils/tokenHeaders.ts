import bkashConfig from '../config/bkashConfig.json';
import { TokenHeaders } from './types';

export const tokenHeaders = (): TokenHeaders => {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    username: bkashConfig.username,
    password: bkashConfig.password,
  };
};
