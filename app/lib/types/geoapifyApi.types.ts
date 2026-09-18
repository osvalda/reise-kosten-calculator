export interface GeoapifyApiResponse {
    results: [{
        lat: number;
        lon: number;
        postcode: string;
        city: string;
    }],
    query: {
        text: string;
        limit: number;
    }
}

export interface GeoapifyRoutingApiResponse {
    features: [{
        properties: {
            distance: number;
            distance_units: string;
        }
    }],
    properties: {
        mode: string;
        units: string;
    },
    type: string;
}

// Represents a single [lat, lon] pair
export type GeoCoordinate = [lat: number, lon: number];

// Represents the list of points to be separated by the '|' pipe
export type WaypointsInput = GeoCoordinate[];

/**
 * Request parameters for the Routing API call
 */
export interface GeoapifyRoutingApiParams {
    waypoints: WaypointsInput;
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

/**
 * Hook return type for consistent typing
 */
export interface UseGeoapifyDataReturn {
    data: GeoapifyApiResponse[] | null;
    isLoading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}