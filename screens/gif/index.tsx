import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useDebounce } from "@/hooks/use-debounce";
import { useGifs } from "@/hooks/use-gif";
import { usePost } from "@/providers/PostProvider";
import * as Crypto from "expo-crypto";
import { router, useLocalSearchParams } from "expo-router";
import { Search } from "lucide-react-native";
import { useState } from "react";
import { FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Gif() {
    const { threadId } = useLocalSearchParams();
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading, error, refetch } = useGifs(debouncedSearch);

    const { uploadFile, setPhoto } = usePost();

    const handleUpload = async (url: string) => {
        const name = `${Crypto.randomUUID()}.gif`;

        await uploadFile(threadId as string, url, "image/gif", name);
        setPhoto(url);
        router.back();
    };

    return (
        <SafeAreaView>
            <VStack space="3xl" className="p-5">
                <Input className="rounded-lg p-2">
                    <InputSlot className="pl-3">
                        <InputIcon as={Search} />
                    </InputSlot>
                    <InputField
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search..."
                    />
                </Input>
                <FlatList
                    numColumns={3}
                    data={data?.data}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    handleUpload(item.images.original.url);
                                }}
                            >
                                <Image
                                    source={{
                                        uri: item.images.original.url,
                                    }}
                                    className="h-32 w-32 m-1 rounded-lg"
                                />
                            </TouchableOpacity>
                        );
                    }}
                />
            </VStack>
        </SafeAreaView>
    );
}
