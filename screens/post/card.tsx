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
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { PostInterface } from "@/lib/types";
import { useAuth } from "@/providers/AuthProvider";
import {
    Camera,
    Hash,
    ImagePlay,
    Images,
    MapPin,
    Mic,
} from "lucide-react-native";

const PostCard = ({
    post,
    updatePost,
}: {
    post: PostInterface;
    updatePost: (id: string, text: string) => void;
}) => {
    const { user } = useAuth();
    return (
        <HStack className="items-center px-3" space="md">
            <VStack className="items-center" space="md">
                <Avatar size="md">
                    <AvatarFallbackText>{user.username}</AvatarFallbackText>
                    <AvatarImage source={{ uri: user?.avatar }} />
                    <AvatarBadge />
                </Avatar>
                <Divider orientation="vertical" className="h-16" />
            </VStack>
            <Card size="md" className="m-3 bg-transparent">
                <VStack className="p-3" space="lg">
                    <VStack>
                        <Heading size="md" className="mb-1">
                            {user?.username}
                        </Heading>
                        <Input size="md" className="border-0">
                            <InputField
                                placeholder="What's new?"
                                className="px-0"
                                value={post.text}
                                onChangeText={(text) =>
                                    updatePost(post.id, text)
                                }
                            ></InputField>
                        </Input>
                    </VStack>
                    <HStack className="items-center" space="3xl">
                        <Images size={24} color="gray" strokeWidth={1.5} />
                        <Camera size={24} color="gray" strokeWidth={1.5} />
                        <ImagePlay size={24} color="gray" strokeWidth={1.5} />
                        <Mic size={24} color="gray" strokeWidth={1.5} />
                        <Hash size={24} color="gray" strokeWidth={1.5} />
                        <MapPin size={24} color="gray" strokeWidth={1.5} />
                    </HStack>
                </VStack>
            </Card>
        </HStack>
    );
};
export default PostCard;
