import { Divider } from "@/components/ui/divider";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useDebounce } from "@/hooks/use-debounce";
import { usePlaces } from "@/hooks/use-location";
import { supabase } from "@/lib/supabase";
import { PlaceInterface } from "@/lib/types";
import { usePost } from "@/providers/PostProvider";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { Search } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Places() {
    const { threadId } = useLocalSearchParams();
    const [search, setSearch] = useState("");
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

    const debouncedSearch = useDebounce(search, 500);

    const { data, isLoading, error } = usePlaces(debouncedSearch, location);

    const { updatePost } = usePost();

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const addPlace = async (place: PlaceInterface) => {
        const { data, error } = await supabase
            .from("Place")
            .insert({
                name: place.name,
                latitude: place?.geometry?.location?.lat,
                longitude: place?.geometry?.location?.lng,
                address: place.vicinity || place.formatted_address,
            })
            .select();

        if (!error) updatePost(threadId as string, "place_id", data?.[0]?.id);
        router.back();
    };

    const getCurrentLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access location was denied");
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });
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
                    numColumns={1}
                    data={data}
                    ItemSeparatorComponent={() => <Divider />}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    addPlace(item);
                                }}
                                style={{ paddingVertical: 10 }}
                            >
                                <Text size="lg" bold>
                                    {item?.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                />
            </VStack>
        </SafeAreaView>
    );
}
