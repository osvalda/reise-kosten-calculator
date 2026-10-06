import { z } from 'zod';

const RoutingResultSchema = z.object({
    distance: z.number(),
    distance_units: z.string(),
});

export const RoutingResponseSchema = z.object({
    results: z.array(RoutingResultSchema)
});

const LocationResultSchema = z.object({
    city: z.string(),
    postcode: z.string(),
    lon: z.number(),
    lat: z.number(),
});

export const LocationResponseSchema = z.object({
    results: z.array(LocationResultSchema),
});

// Infer types
export type LocationResult = z.infer<typeof LocationResultSchema>;
export type LocationResponse = z.infer<typeof LocationResponseSchema>;
export type RoutingResult = z.infer<typeof RoutingResultSchema>;
export type RoutingResponse = z.infer<typeof RoutingResponseSchema>;

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