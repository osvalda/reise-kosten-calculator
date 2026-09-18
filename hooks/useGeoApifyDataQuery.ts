'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import {
    GeoapifyApiResponse,
    GeoapifyApiParams,
    GeoapifyRoutingApiResponse,
    GeoapifyRoutingApiParams,
} from '../app/lib/types/geoapifyApi.types';

const fetchGeoapifyData = async (
    params?: GeoapifyApiParams
): Promise<GeoapifyApiResponse> => {
    const response = await axios.get<GeoapifyApiResponse>('/api/geoCode', {
        params,
    });
    return response.data;
};

export const useGeoapifyDataQuery = (
    params?: GeoapifyApiParams
): UseQueryResult<GeoapifyApiResponse, Error> => {
    return useQuery({
        queryKey: ['geoapifyData', params],
        queryFn: () => fetchGeoapifyData(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        enabled: !!params?.text
    });
};

const fetchGeoapifyRoutingData = async (
    params?: GeoapifyRoutingApiParams
): Promise<GeoapifyRoutingApiResponse> => {
    const waypointsString = params?.waypoints?.map(([lat, lon]) => `${lat},${lon}`).join('|');
    console.log('Routing waypoints string:', waypointsString);
    const response = await axios.get<GeoapifyRoutingApiResponse>('/api/routeing', {
        params: { ...params, waypoints: waypointsString },
    });
    return response.data;
};

export const useGeoapifyRoutingDataQuery = (
    params?: GeoapifyRoutingApiParams
): UseQueryResult<GeoapifyRoutingApiResponse, Error> => {
    return useQuery({
        queryKey: ['geoapifyRoutingData', params],
        queryFn: () => fetchGeoapifyRoutingData(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        enabled: !!params?.waypoints && params.waypoints.length > 0
    });
};