import { usePost } from "@/providers/PostProvider";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useLocalSearchParams } from "expo-router";
import { CheckCircle, Circle } from "lucide-react-native";
import { useRef } from "react";

import { Button, Image, Text, TouchableOpacity, View } from "react-native";

export default function Camera() {
    const { threadId } = useLocalSearchParams();
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    const { uploadFile, setPhoto, photo } = usePost();

    const takePhoto = async () => {
        if (cameraRef.current && threadId) {
            const photo = await cameraRef.current.takePictureAsync();
            if (!photo) return;

            setPhoto(photo.uri);

            let filename = photo.uri.split("/").pop();
            if (!filename) return;

            uploadFile(
                threadId,
                photo.uri,
                `image/${filename.split(".").pop()}`,
                filename
            );
        }
    };

    if (!permission) return null;

    if (!permission.granted) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-center text-lg">
                    We need your permission to show the camera
                </Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    if (photo)
        return (
            <View className="flex-1 items-center justify-center">
                <Image
                    source={{ uri: photo }}
                    className="h-full w-full absolute"
                />
                <TouchableOpacity
                    className="bg-white rounded-full p-2"
                    onPress={() => {
                        router.back();
                    }}
                    style={{ marginBottom: 50 }}
                >
                    <CheckCircle color="black" size={75} />
                </TouchableOpacity>
            </View>
        );

    return (
        <CameraView
            style={{ flex: 1, padding: 54 }}
            facing="back"
            ref={cameraRef}
        >
            <View className="flex-1 flex-row justify-end items-end">
                <TouchableOpacity
                    className="flex-1 items-center"
                    onPress={takePhoto}
                >
                    <Circle size={24} color="white" />
                </TouchableOpacity>
            </View>
        </CameraView>
    );
}
