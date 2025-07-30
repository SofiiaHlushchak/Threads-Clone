import { supabase } from "@/lib/supabase";
import { PostInterface } from "@/lib/types";
import * as Crypto from "expo-crypto";
import React, { createContext, useContext, useEffect, useState } from "react";

import { router } from "expo-router";
import { useAuth } from "./AuthProvider";

type PostContextType = {
    posts: PostInterface[];
    uploadPosts: () => void;
    addThreads: () => void;
    updatePost: (id: string, key: string, value: string) => void;
    clearPosts: () => void;
    uploadFile: (id: string, uri: string, type: string, name: string) => void;
    setPhoto: (uri: string | undefined) => void;
    photo: string | undefined;
};

export const PostContext = createContext<PostContextType>({
    posts: [],
    uploadPosts: () => {},
    addThreads: () => {},
    updatePost: () => {},
    clearPosts: () => {},
    uploadFile: () => {},
    setPhoto: () => {},
    photo: undefined,
});

export const usePost = () => useContext(PostContext);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();

    const DefaultPost: PostInterface = {
        id: Crypto.randomUUID(),
        user_id: user.id,
        parent_id: null,
        text: "",
        file: null,
        place_id: null,
    };

    const [posts, setPosts] = useState<PostInterface[]>([DefaultPost]);
    const [photo, setPhoto] = useState<string | undefined>("");

    useEffect(() => {
        if (user) {
            updatePost(posts[0].id, "user_id", user.id);
        }
    }, [user]);

    const uploadPosts = async () => {
        if (!user) return;

        const { data, error } = await supabase.from("Post").insert(posts);

        if (!error) {
            clearPosts();
            setPhoto("");
            router.back();
        }
    };

    const updatePost = (id: string, key: string, value: string) => {
        setPosts(
            posts.map((p: PostInterface) =>
                p.id === id ? { ...p, [key]: value } : p
            )
        );
    };

    const addThreads = () => {
        setPosts([...posts, { ...DefaultPost, parent_id: posts[0].id }]);
    };

    const clearPosts = () => {
        setPosts([DefaultPost]);
    };

    const uploadFile = async (
        id: string,
        uri: string,
        type: string,
        name: string
    ) => {
        if (!uri) return;

        let newFormData = new FormData();

        newFormData.append("file", {
            uri,
            name,
            type,
        });

        const { data, error } = await supabase.storage
            .from(`files/${user?.id}`)
            .upload(name, newFormData);

        if (data) updatePost(id, "file", data?.path);
    };

    return (
        <PostContext.Provider
            value={{
                posts,
                uploadPosts,
                addThreads,
                updatePost,
                clearPosts,
                uploadFile,
                setPhoto,
                photo,
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
