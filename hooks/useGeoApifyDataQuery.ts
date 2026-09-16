'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import {
    GeoapifyApiResponse,
    GeoapifyApiParams,
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