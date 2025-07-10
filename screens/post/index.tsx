import { SafeAreaView } from "react-native";

import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import {
    Camera,
    Hash,
    ImagePlay,
    Images,
    MapPin,
    Mic,
} from "lucide-react-native";

const Post = () => {
    const { user } = useAuth();

    const onPress = async () => {
        const { data, error } = await supabase.from("Post").insert({
            id: Crypto.randomUUID(),
            user_id: user.id,
            text: "text",
        });

        if (!error) router.back();
    };
    return (
        <SafeAreaView>
            <HStack className="items-center p-5">
                <Avatar size="md">
                    <AvatarFallbackText>Jane Doe</AvatarFallbackText>
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
                            <Images size={24} color="gray" strokeWidth={1.5} />
                            <Camera size={24} color="gray" strokeWidth={1.5} />
                            <ImagePlay
                                size={24}
                                color="gray"
                                strokeWidth={1.5}
                            />
                            <Mic size={24} color="gray" strokeWidth={1.5} />
                            <Hash size={24} color="gray" strokeWidth={1.5} />
                            <MapPin size={24} color="gray" strokeWidth={1.5} />
                        </HStack>
                    </VStack>
                </Card>
            </HStack>
            <Button onPress={onPress}>
                <ButtonText>Post</ButtonText>
            </Button>
        </SafeAreaView>
    );
};

export default Post;
