import axios from "axios";

const GEOAPIFY_API_KEY = process.env.GEOAPIFY_API_KEY;

export type geocodeResponse = {
    lat: number;
    lon: number;
    postcode: string;
    city: string;
    error?: string;
};

export type FETCH_TYPE = 'city' | 'postcode';

export async function geocodingData(city: string, type: FETCH_TYPE = 'city'): Promise<geocodeResponse> {

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.geoapify.com/v1/geocode/search?text=' + city + '&limit=1' + '&type=' + type + '&format=json&apiKey=' + GEOAPIFY_API_KEY,
        headers: {}
    };

    try {
        const response = await axios.request(config);
        return await response.data.results[0] as geocodeResponse;
    } catch (error) {
        console.error("Error during geocoding:", error);
        return { lat: 0, lon: 0, postcode: "", city: "", error: "Failed to geocode city" };
    }
}

export async function distanceCalculation(from: geocodeResponse, to: geocodeResponse): Promise<string> {
    // Implementation for distance calculation
    return "Distance calculation result";
}
