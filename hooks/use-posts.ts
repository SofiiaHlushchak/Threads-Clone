import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const getPosts = async () => {
    const { data, error } = await supabase
        .from("Post")
        .select("*, User(*), Place(*)")
        .is("parent_id", null)
        .order("created_at", { ascending: false });

    if (!error) return data;
};

export const usePosts = () => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: () => getPosts(),
    });

    return { data, isLoading, error, refetch };
};
