import axios, { AxiosError } from 'axios';
import { Endpoints } from './endpoints';

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
});


export { api, Endpoints, AxiosError }

