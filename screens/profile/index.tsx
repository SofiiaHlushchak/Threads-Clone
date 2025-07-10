import { SafeAreaView, Text } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";

const Profile = () => {
    const { logOut } = useAuth();
    return (
        <SafeAreaView>
            <Text>Profile</Text>
            <Button onPress={logOut}>
                <ButtonText>Log Out</ButtonText>
            </Button>
        </SafeAreaView>
    );
};

export default Profile;
