import { FlatList, Pressable, SafeAreaView } from "react-native";

import ThreadsIcon from "@/assets/icons/threads";
import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
} from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { router, usePathname } from "expo-router";
import {
    Camera,
    Hash,
    ImagePlay,
    Images,
    MapPin,
    Mic,
} from "lucide-react-native";
import { useEffect, useState } from "react";

const Home = () => {
    const { user } = useAuth();

    const [threads, setThreads] = useState([]);

    const pathname = usePathname();

    const getThreads = async () => {
        const { data, error } = await supabase
            .from("Post")
            .select("*, User(*)")
            .not("parent_id", "is", null)
            .order("created_at", { ascending: false });
        if (!error) return setThreads(data);
    };

    useEffect(() => {
        if (pathname === "/") {
            getThreads();
        }
    }, [pathname]);
    return (
        <SafeAreaView>
            <HStack className="justify-center items-center p-3">
                <ThreadsIcon size={40} />
            </HStack>
            <Pressable
                onPress={() => {
                    router.push("/post");
                }}
            >
                <HStack className="items-center px-5">
                    <Avatar size="md">
                        <AvatarFallbackText>{user?.username}</AvatarFallbackText>
                        <AvatarImage source={{ uri: user?.avatar }} />
                        <AvatarBadge />
                    </Avatar>
                    <Card size="md" className="m-3 bg-transparent">
                        <VStack className="p-3" space="lg">
                            <VStack>
                                <Heading size="md" className="mb-1">
                                    {user?.username}
                                </Heading>
                                <Text size="sm">What&apos;s new?</Text>
                            </VStack>
                            <HStack className="items-center" space="3xl">
                                <Images
                                    size={24}
                                    color="gray"
                                    strokeWidth={1.5}
                                />
                                <Camera
                                    size={24}
                                    color="gray"
                                    strokeWidth={1.5}
                                />
                                <ImagePlay
                                    size={24}
                                    color="gray"
                                    strokeWidth={1.5}
                                />
                                <Mic size={24} color="gray" strokeWidth={1.5} />
                                <Hash
                                    size={24}
                                    color="gray"
                                    strokeWidth={1.5}
                                />
                                <MapPin
                                    size={24}
                                    color="gray"
                                    strokeWidth={1.5}
                                />
                            </HStack>
                        </VStack>
                    </Card>
                </HStack>
                <Divider />
                <VStack space="lg">
                    <FlatList
                        data={threads}
                        renderItem={({ item }) => {
                            return (
                                <HStack className="items-center p-3" space="sm">
                                    <Avatar size="md">
                                        <AvatarFallbackText>
                                            {item.User.username}
                                        </AvatarFallbackText>
                                        <AvatarImage
                                            source={{ uri: item.User?.avatar }}
                                        />
                                    </Avatar>
                                    <VStack className="flex-1">
                                        <HStack
                                            className="items-center"
                                            space="sm"
                                        >
                                            <Text size="md" bold>
                                                {item.User.username}
                                            </Text>
                                            <Text
                                                size="md"
                                                className="text-gray-500 text-xs"
                                            >
                                                {new Date(
                                                    item.created_at
                                                ).toLocaleDateString()}
                                            </Text>
                                        </HStack>

                                        <Text>{item.text}</Text>
                                    </VStack>
                                </HStack>
                            );
                        }}
                    />
                </VStack>
            </Pressable>
        </SafeAreaView>
    );
};

export default Home;
