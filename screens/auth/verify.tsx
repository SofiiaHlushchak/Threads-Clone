import { Text } from "@/components/ui/text";
import { supabase } from "@/lib/supabase";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Layout from "./_layout";

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
        <Layout onPress={handleVerify} buttonText="Verify">
            <Text className="text-2xl font-size">Verify</Text>
            <OTPInputView
                pinCount={6}
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
