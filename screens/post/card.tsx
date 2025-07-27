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
import { usePost } from "@/providers/PostProvider";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import {
    Camera,
    Hash,
    ImagePlay,
    Images,
    MapPin,
    Mic,
} from "lucide-react-native";
import { Image, Pressable } from "react-native";

interface PostCardProps {
    post: PostInterface;
}
const PostCard = ({ post }: PostCardProps) => {
    const { user } = useAuth();
    const { uploadFile, updatePost, photo, setPhoto } = usePost();

    const addPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
        });

        let uri = result.assets?.[0]?.uri;
        let type = result.assets?.[0]?.mimeType;
        let name = uri?.split("/").pop();

        setPhoto(uri);
        uploadFile(post.id, uri, type, name);
    };
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
                                    updatePost(post.id, "text", text)
                                }
                            ></InputField>
                        </Input>

                        {photo && (
                            <Image
                                source={{ uri: photo }}
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 10,
                                }}
                            />
                        )}
                    </VStack>
                    <HStack className="items-center" space="3xl">
                        <Pressable onPress={addPhoto}>
                            <Images size={24} color="gray" strokeWidth={1.5} />
                        </Pressable>

                        <Pressable
                            onPress={() => {
                                setPhoto("");
                                router.push({
                                    pathname: "/camera",
                                    params: { threadId: post.id },
                                });
                            }}
                        >
                            <Camera size={24} color="gray" strokeWidth={1.5} />
                        </Pressable>

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
