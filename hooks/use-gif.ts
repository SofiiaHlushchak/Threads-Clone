import { useQuery } from "@tanstack/react-query";

export const getGifs = async () => {
    const response = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.EXPO_PUBLIC_GIPHY_API_KEY}&limit=18`
    );

    const data = response.json();
    return data;
};

export const searchGifs = async (query: string) => {
    const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.EXPO_PUBLIC_GIPHY_API_KEY}&q=${query}&limit=18`
    );

    const data = response.json();
    return data;
};

export const useGifs = (query: string) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["gifs", query],
        queryFn: () => (query ? searchGifs(query) : getGifs()),
    });

    return { data, isLoading, error, refetch };
};
