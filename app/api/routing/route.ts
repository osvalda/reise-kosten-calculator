import { NextRequest, NextResponse } from 'next/server';
import { fetchRoutingData } from '../../lib/api/geoapifyApiClient';
import { GeoapifyRoutingApiParams } from '../../lib/types/geoapifyApi.types';

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Extract query parameters
        const searchParams = request.nextUrl.searchParams;

        const params: GeoapifyRoutingApiParams = {
            waypoints: searchParams.get('waypoints') ?? "",
        };

        // Call the server-side API client
        const result = await fetchRoutingData(params);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
            );
        }

        return NextResponse.json(result.data, { status: 200 });
    } catch (error) {
        console.error('[Routing API Route] Error:', error);

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}