import {
    Avatar,
    AvatarFallbackText,
    AvatarImage,
} from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { PostInterface } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Repeat, Send } from "lucide-react-native";
import { Image } from "react-native";

const View = ({ item }: { item: PostInterface }) => {
    return (
        <Card>
            <HStack space="md">
                <Avatar size="md">
                    <AvatarFallbackText>
                        {item.User?.username}
                    </AvatarFallbackText>
                    <AvatarImage
                        source={{
                            uri: item.User?.avatar,
                        }}
                    />
                </Avatar>
                <VStack className="flex-1" space="md">
                    <VStack>
                        <HStack className="items-center" space="md">
                            <Text size="lg" bold>
                                {item.User?.username}
                            </Text>
                            <Text size="md" className="text-gray-500 text-xs">
                                {item.created_at &&
                                    formatDistanceToNow(
                                        new Date(item.created_at).getTime() -
                                            new Date().getTimezoneOffset() *
                                                60000,
                                        { addSuffix: true }
                                    )}
                            </Text>
                        </HStack>
                        {item.Place?.name && <Text size="sm" bold>{item.Place?.name}</Text>}
                    </VStack>

                    <Text>{item.text}</Text>

                    {item.file && (
                        <Image
                            source={{
                                uri: `${process.env.EXPO_PUBLIC_BUCKET_URL}/${item.user_id}/${item.file}`,
                            }}
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 10,
                            }}
                        />
                    )}

                    <HStack className="items-center" space="lg">
                        <Heart size={20} color="gray" strokeWidth={1.5} />

                        <MessageCircle
                            size={20}
                            color="gray"
                            strokeWidth={1.5}
                        />

                        <Repeat size={20} color="gray" strokeWidth={1.5} />

                        <Send size={20} color="gray" strokeWidth={1.5} />
                    </HStack>
                </VStack>
            </HStack>
            <Divider className="w-hull mt-5" />
        </Card>
    );
};

export default View;
