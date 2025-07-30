import { useQuery } from "@tanstack/react-query";

type Location = {
    latitude: number;
    longitude: number;
};

const getSearch = async (search: string, location: Location | null) => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
            search
        )}&location=${location?.latitude},${
            location?.longitude
        }&radius=1000&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const { results } = await response.json();

    return results.slice(0, 10);
};

const getNearby = async (location: Location | null) => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=restaurant&radius=1000&location=${location?.latitude},${location?.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const { results } = await response.json();
    return results.slice(0, 10) || [];
};

export const usePlaces = (search: string | null, location: Location | null) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["places", search, location],
        queryFn: () =>
            search ? getSearch(search, location) : getNearby(location),
        enabled: !!location,
    });

    return { data, isLoading, error };
};
