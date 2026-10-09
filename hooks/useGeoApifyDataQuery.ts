'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import {
    GeoapifyApiParams,
    GeoapifyRoutingApiParams,
    LocationResult,
    RoutingResult,
} from '../app/lib/types/geoapifyApi.types';

const fetchGeoapifyData = async (
    params?: GeoapifyApiParams
): Promise<LocationResult> => {
    const response = await axios.get<LocationResult>('/api/geoCode', {
        params,
    });
    return response.data;
};

export const useGeoapifyDataQuery = (
    params?: GeoapifyApiParams
): UseQueryResult<LocationResult, Error> => {
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
): Promise<RoutingResult> => {
    const waypointsString = params?.waypoints;
    console.log('Routing waypoints string:', waypointsString);
    const response = await axios.get<RoutingResult>('/api/routing', {
        params: { ...params, waypoints: waypointsString },
    });
    if (response.status === 200) {
        return response.data;
    }
    throw new Error('Failed to fetch routing data');
};

export const useGeoapifyRoutingDataQuery = (
    params?: GeoapifyRoutingApiParams
): UseQueryResult<RoutingResult, Error> => {
    return useQuery({
        queryKey: ['geoapifyRoutingData', params],
        queryFn: () => fetchGeoapifyRoutingData(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        enabled: !!params?.waypoints && params.waypoints.length > 0
    });
};