/**
 * Validated environment variables
 * Throws at build time if required vars are missing
 */
export const env = {
    externalApi: {
        baseUrl: process.env.GEOAPIFY_API_BASE_URL!,
        apiKey: process.env.GEOAPIFY_API_KEY!,
        timeout: parseInt(process.env.GEOAPIFY_API_TIMEOUT || '10000', 10),
    },
} as const;

// Validation (runs at startup)
if (!process.env.GEOAPIFY_API_BASE_URL) {
    throw new Error('GEOAPIFY_API_BASE_URL is not defined');
}

if (!process.env.GEOAPIFY_API_KEY) {
    throw new Error('GEOAPIFY_API_KEY is not defined');
}