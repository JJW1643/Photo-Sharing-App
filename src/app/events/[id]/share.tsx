import { View, Text, TextInput } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";


export default function Share() {
    const { id } = useLocalSearchParams<{id: string}>();
    
    return (
        <View className="flex-1 items-center p-4 gap-4">
            <Text className='text-white text-2xl font-bold'>
                Share Event With Your Friends
            </Text>
        
            {/* <QRCode
            value={'photosharing://events/${id}/join'} size={200}
            /> */}

            <QRCode
            value={'exp://192.168.1.62:8082/ -- /events/${id}/join'} size={200}
            />

        </View>



    );
}