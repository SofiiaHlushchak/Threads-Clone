import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
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
import { useState } from "react";

const Post = () => {
    const { user } = useAuth();
    const [text, setText] = useState("");

    const onPress = async () => {
        const { data, error } = await supabase.from("Post").insert({
            id: Crypto.randomUUID(),
            user_id: user.id,
            text,
        });

        if (!error) router.back();
    };
    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={75}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <VStack space="lg" className="h-full justify-between">
                        <VStack>
                            <HStack className="justify-between items-center p-3">
                                <Button
                                    onPress={() => {
                                        router.back();
                                    }}
                                    size="lg"
                                    variant="link"
                                >
                                    <ButtonText>Cancel</ButtonText>
                                </Button>
                                <Text
                                    size="lg"
                                    className="font-bold text-black"
                                >
                                    New Thread
                                </Text>
                                <View className="w-10" />
                            </HStack>
                            <Divider />
                            <HStack className="items-center px-5">
                                <VStack className="items-center" space="md">
                                    <Avatar size="md">
                                        <AvatarFallbackText>
                                            {user.username}
                                        </AvatarFallbackText>
                                        <AvatarImage
                                            source={{ uri: user?.avatar }}
                                        />
                                        <AvatarBadge />
                                    </Avatar>
                                    <Divider
                                        orientation="vertical"
                                        className="h-16"
                                    />
                                </VStack>
                                <VStack space="md">
                                    <Card
                                        size="md"
                                        className="m-3 bg-transparent"
                                    >
                                        <VStack className="p-3" space="lg">
                                            <VStack>
                                                <Heading
                                                    size="md"
                                                    className="mb-1"
                                                >
                                                    {user?.username}
                                                </Heading>
                                                <Input
                                                    size="md"
                                                    className="border-0"
                                                >
                                                    <InputField
                                                        placeholder="What's new?"
                                                        className="px-0"
                                                        value={text}
                                                        onChangeText={setText}
                                                    ></InputField>
                                                </Input>
                                            </VStack>
                                            <HStack
                                                className="items-center"
                                                space="3xl"
                                            >
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
                                                <Mic
                                                    size={24}
                                                    color="gray"
                                                    strokeWidth={1.5}
                                                />
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
                                    <HStack
                                        className="items-center p-3"
                                        space="md"
                                    >
                                        <Avatar size="sm">
                                            <AvatarFallbackText>
                                                {user.username}
                                            </AvatarFallbackText>
                                            <AvatarImage
                                                source={{ uri: user?.avatar }}
                                            />
                                            <AvatarBadge />
                                        </Avatar>
                                        <Button
                                            className="rounded-full"
                                            variant="link"
                                            onPress={onPress}
                                        >
                                            <ButtonText>
                                                Add to Thread
                                            </ButtonText>
                                        </Button>
                                    </HStack>
                                </VStack>
                            </HStack>
                        </VStack>
                    </VStack>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Post;
