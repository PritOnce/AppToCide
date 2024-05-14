import { View, Text, Image, TouchableOpacity } from "react-native";

import Fondo from "../Maquetas/Fondo";

import { useNavigation } from '@react-navigation/native';
export default function MenuPage() {
    const navigation = useNavigation();

    const promesaLogOut  = new Promise((resolve) => {
        resolve('hola');
    })

    const handleLogOut = async () => {
       promesaLogOut().then(() => navigation.navigate('StartPage'));
        
    }

    return (
        <Fondo>
            <View>
                <Image source={require("../assets/icono.png")} />
                <TouchableOpacity
                    onPress={handleLogOut} >
                    <Text>SALIR</Text>
                </TouchableOpacity>
            </View>
        </Fondo>

    )
}