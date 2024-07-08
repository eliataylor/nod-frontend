import axios from 'axios';
import { config } from '../config/config';
import { store } from '../app/store';
import dayjs from 'dayjs';
import { refreshToken } from '../features/auth/authSlice';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export const axiosPublic = axios.create({
    baseURL: config.api.url,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosPrivate = axios.create({
    baseURL: config.api.url,
    headers: {
        'Content-Type': 'application/json',
    },
});

const isRefreshNeeded = () => {
    const currentTimeUTC = dayjs().utc().format();
    const ate = store?.getState()?.auth?.accessTokenExpiration;
    const expiration = ate ? ate : currentTimeUTC;
    const remaining = Math.max(
        0,
        dayjs(expiration).diff(currentTimeUTC, 'seconds')
    );
    return remaining < 30;
};

const pendingRequests = new Map();

axiosPrivate.interceptors.request.use(
    async (config) => {
        const requestKey = `${config.method}_${config.url}_${JSON.stringify(config.data)}_${dayjs().format('YYYY-MM-DDTHH:mm:ss')}`;

        if (pendingRequests.has(requestKey)) {
            console.log(`Duplicate request detected: ${requestKey}`);
            return Promise.reject(new Error(`Duplicate request: ${requestKey}`));
        }

        pendingRequests.set(requestKey, true);

        const authData = store?.getState()?.auth;

        if (authData?.accessToken) {
            if (isRefreshNeeded()) {
                await store.dispatch(refreshToken());
            }
            if (config?.headers) {
                config.headers['authorization'] = `Bearer ${
                    store?.getState()?.auth?.accessToken
                }`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosPrivate.interceptors.response.use(
    (response) => {
        const requestKey = `${response.config.method}_${response.config.url}_${JSON.stringify(response.config.data)}_${dayjs().format('YYYY-MM-DDTHH:mm:ss')}`;
        pendingRequests.delete(requestKey);
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
