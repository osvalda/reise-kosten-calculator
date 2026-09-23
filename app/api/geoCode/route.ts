import { NextRequest, NextResponse } from 'next/server';
import { fetchGeoapifyData } from '../../lib/api/geoapifyApiClient';
import { GeoapifyApiParams } from '../../lib/types/geoapifyApi.types';

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        // Extract query parameters
        const searchParams = request.nextUrl.searchParams;

        const params: GeoapifyApiParams = {
            text: searchParams.get('text') ?? "",
        };

        if (searchParams.has('filter')) {
            params.filter = searchParams.get('filter') ?? "";
        }

        // Call the server-side API client
        const result = await fetchGeoapifyData(params);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
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