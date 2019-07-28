import axios, { AxiosInstance } from 'axios';
import { getCookie } from '@/util';

export default class AxiosServie {
  static readonly instance: AxiosInstance = axios.create({
    headers: {
      'x-access-token': getCookie('x-access-token'),
    },
  });
}
