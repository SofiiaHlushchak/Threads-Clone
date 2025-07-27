import { FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
import { usePosts } from "@/hooks/use-posts";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import {
    Camera,
    Hash,
    ImagePlay,
    Images,
    MapPin,
    Mic,
} from "lucide-react-native";
import View from "./view";

const Home = () => {
    const { user } = useAuth();

    const { data, refetch, isLoading } = usePosts();

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
                        <AvatarFallbackText>
                            {user?.username}
                        </AvatarFallbackText>
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
            </Pressable>
            <VStack space="lg">
                <FlatList
                    data={data}
                    refreshing={isLoading}
                    onRefresh={refetch}
                    renderItem={({ item }) => {
                        return <View item={item} />;
                    }}
                />
            </VStack>
        </SafeAreaView>
    );
};

export default Home;
