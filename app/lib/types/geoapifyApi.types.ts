import { z } from 'zod';

export interface GeoapifyRoutingApiResponse {
    results: [{
        distance: number;
        distance_units: string;
    }],
    query: {
        text: string;
        limit: number;
    }
}

export const LocationResultSchema = z.object({
    city: z.string(),
    postcode: z.string(),
    lon: z.number(),
    lat: z.number(),
});

// Schema for the full API response
export const LocationResponseSchema = z.object({
    results: z.array(LocationResultSchema),
});

// Infer types
export type LocationResult = z.infer<typeof LocationResultSchema>;
export type LocationResponse = z.infer<typeof LocationResponseSchema>;

/**
 * Request parameters for the Routing API call
 */
export interface GeoapifyRoutingApiParams {
    waypoints: string;
    mode?: "drive" | "walk" | "bike";
    units?: "metric" | "imperial";
    format?: "json" | "xml";
    type?: "short" | "balanced";
}
/**
 * Request parameters for the API call
 */
export interface GeoapifyApiParams {
    text: string;
    limit?: number;
    type?: "city" | "postcode";
    format?: "json" | "xml";
    filter?: string;
}

/**
 * Wrapper for API responses in the application
 */
export interface ApiResult<T> {
    data: T | null;
    error: string | null;
    success: boolean;
}