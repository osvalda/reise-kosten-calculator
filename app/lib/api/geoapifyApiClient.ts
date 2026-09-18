import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { env } from '../config/env';
import {
    GeoapifyApiResponse,
    GeoapifyApiParams,
    ApiResult,
    GeoapifyRoutingApiResponse,
    GeoapifyRoutingApiParams,
} from '../types/geoapifyApi.types';

/**
 * Creates a configured Axios instance for the Geoapify API
 * This should only be used server-side to protect the API key
 */
const createGeoApifyApiClient = (): AxiosInstance => {
    const client = axios.create({
        baseURL: env.externalApi.baseUrl,
        timeout: env.externalApi.timeout,
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': env.externalApi.apiKey,
        },
    });

    // Request interceptor for logging (optional)
    client.interceptors.request.use(
        (config) => {
            console.log(`[Geoapify API] ${config.method?.toUpperCase()} ${config.url}`);
            return config;
        },
        (error) => {
            console.error('[Geoapify API] Request error:', error);
            return Promise.reject(error);
        }
    );

    // Response interceptor for error handling
    client.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            console.error('[Geoapify API] Response error:', {
                status: error.response?.status,
                message: error.message,
                url: error.config?.url,
            });
            return Promise.reject(error);
        }
    );

    return client;
};

// Singleton instance
const externalApiClient = createGeoApifyApiClient();

/**
 * Fetches data from the Geoapify DB
 * @param params - Query parameters for the request
 * @returns Promise with typed API result
 */
export const fetchGeoapifyData = async (
    params?: GeoapifyApiParams
): Promise<ApiResult<GeoapifyApiResponse[]>> => {
    try {
        const config: AxiosRequestConfig = {
            params: {
                text: params?.text,
                limit: params?.limit ?? 10,
                type: params?.type ?? 'city',
                format: params?.format ?? 'json',
                filter: params?.filter,
            },
        };

        if (!config.params.text) {
            throw new Error('The \'text\' parameter is required for the Geoapify API request.');
        }

        const response = await externalApiClient.get<GeoapifyApiResponse[]>(
            '/geocode/search',
            config
        );

        return {
            data: response.data,
            error: null,
            success: true,
        };
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;

        const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.message ||
            'An unexpected error occurred';

        return {
            data: null,
            error: errorMessage,
            success: false,
        };
    }
};

/**
* Fetches routing data from the Geoapify DB
* @param params - Query parameters for the routing request
* @returns Promise with typed API result
*/
export const fetchRoutingData = async (
    params?: GeoapifyRoutingApiParams
): Promise<ApiResult<GeoapifyRoutingApiResponse[]>> => {
    try {
        const config: AxiosRequestConfig = {
            params: {
                waypoints: params?.waypoints,
                mode: params?.mode ?? 'drive',
                units: params?.units ?? 'metric',
                format: params?.format ?? 'json',
                type: params?.type ?? 'short',
            },
        };

        if (!config.params.waypoints) {
            throw new Error('The \'waypoints\' parameter is required for the Geoapify Routing API request.');
        }

        const response = await externalApiClient.get<GeoapifyRoutingApiResponse[]>(
            '/routing',
            config
        );

        return {
            data: response.data,
            error: null,
            success: true,
        };
    } catch (error) {
        const axiosError = error as AxiosError<{ message?: string }>;

        const errorMessage =
            axiosError.response?.data?.message ||
            axiosError.message ||
            'An unexpected error occurred';

        return {
            data: null,
            error: errorMessage,
            success: false,
        };
    }
};