import { Button, ButtonText } from "@/components/ui/button";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native";

const Verify = () => {
    const [token, setToken] = useState("");

    const { phone } = useLocalSearchParams();

    const handleVerify = async () => {
        console.log(token);
        const { data, error } = await supabase.auth.verifyOtp({
            phone: phone as string,
            token,
            type: "sms",
        });

        console.log("data, error", data, error);
    };
    return (
        <SafeAreaView>
            <Text className="text-2xl font-size">Verify</Text>
            <Input variant="outline" size="md">
                <InputField
                    placeholder="Phone number"
                    value={token}
                    onChangeText={setToken}
                    keyboardType="phone-pad"
                />
            </Input>
            <Button onPress={handleVerify}>
                <ButtonText>Verify</ButtonText>
            </Button>
        </SafeAreaView>
    );
};

export default Verify;
