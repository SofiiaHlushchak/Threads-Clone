import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { supabase } from "@/lib/supabase";
import { PostInterface } from "@/lib/types";
import { useAuth } from "@/providers/AuthProvider";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import PostCard from "./card";

const Post = () => {
    const { user } = useAuth();
    const [posts, setPosts] = useState<PostInterface[]>([]);

    const DefaultPost: PostInterface = {
        id: Crypto.randomUUID(),
        user_id: user.id,
        parent_id: null,
        text: "",
    };

    useEffect(() => {
        setPosts([DefaultPost]);
    }, []);

    const onPress = async () => {
        const { data, error } = await supabase.from("Post").insert(posts);

        if (!error) router.back();
    };

    const updatePost = (id: string, text: string) => {
        setPosts(
            posts.map((p: PostInterface) => (p.id === id ? { ...p, text } : p))
        );
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={75}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView className="h-full">
                    <HStack className="justify-between items-center p-3">
                        <Button
                            onPress={() => {
                                router.back();
                            }}
                            size="lg"
                            variant="link"
                        >
                            <ButtonText style={{ fontFamily: "LeagueSpartan" }}>
                                Cancel
                            </ButtonText>
                        </Button>
                        <Text size="lg" className="font-bold text-black">
                            New Thread
                        </Text>
                        <View className="w-10" />
                    </HStack>
                    <Divider />
                    <VStack space="lg" className="flex-1 justify-between">
                        <VStack space="md">
                            <FlatList
                                data={posts}
                                renderItem={({ item }) => (
                                    <PostCard
                                        post={item}
                                        updatePost={updatePost}
                                    />
                                )}
                            />

                            <HStack className="items-center px-6" space="md">
                                <Avatar size="xs">
                                    <AvatarFallbackText>
                                        {user.username}
                                    </AvatarFallbackText>
                                    <AvatarImage
                                        source={{ uri: user?.avatar }}
                                    />
                                </Avatar>
                                <Button
                                    className="rounded-full"
                                    variant="link"
                                    onPress={() =>
                                        setPosts([
                                            ...posts,
                                            {
                                                ...DefaultPost,
                                                parent_id: posts[0].id,
                                            },
                                        ])
                                    }
                                >
                                    <ButtonText>Add to Thread</ButtonText>
                                </Button>
                            </HStack>
                        </VStack>
                        <HStack className="items-center justify-between p-3 mb-18">
                            <Text size="sm">Anyone can reply & quote</Text>
                            <Button className="rounded-full" onPress={onPress}>
                                <ButtonText>Post</ButtonText>
                            </Button>
                        </HStack>
                    </VStack>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Post;
