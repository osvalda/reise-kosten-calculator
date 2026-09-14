import { NextRequest, NextResponse } from 'next/server';
import { fetchGeoapifyData } from '../../lib/api/geoapifyApiClient';
import { GeoapifyApiParams } from '../../lib/types/geoapifyApi.types';

/**
 * GET handler for fetching external data
 * Acts as a proxy to protect API keys
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Extract query parameters
        const searchParams = request.nextUrl.searchParams;

        const params: GeoapifyApiParams = {
            text: searchParams.get('text') ?? undefined,
        };

        // Call the server-side API client
        const result = await fetchGeoapifyData(params);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 500 }
            );
        }

        return NextResponse.json(result.data, { status: 200 });
    } catch (error) {
        console.error('[API Route] Error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}