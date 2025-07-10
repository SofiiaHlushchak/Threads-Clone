import { Text } from "@/components/ui/text";
import { supabase } from "@/lib/supabase";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Layout from "./_layout";

const Verify = () => {
    const [token, setToken] = useState("");

    const { phone } = useLocalSearchParams();

    const handleVerify = async () => {
        const { data, error } = await supabase.auth.verifyOtp({
            phone: phone as string,
            token: "01234", // fix it later!!!
            type: "sms",
        });

        router.push("/(auth)/username");
    };
    return (
        <Layout onPress={handleVerify} buttonText="Verify">
            <Text className="text-2xl font-size">Verify</Text>
            <OTPInputView
                pinCount={5}
                autoFocusOnLoad={true}
                onCodeChanged={setToken}
                onCodeFilled={handleVerify}
                codeInputFieldStyle={{
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 10,
                    color: "black",
                }}
            ></OTPInputView>
        </Layout>
    );
};

export default Verify;
