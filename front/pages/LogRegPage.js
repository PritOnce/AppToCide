import React, { useEffect, useState } from "react";
import Fondo from "../Maquetas/Fondo";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

import { useNavigation } from '@react-navigation/native';


export default function LogRegPage() {
    const navigation = useNavigation();

    const [loginText, setLoginText] = useState("");
    const [registerText, setRegisterText] = useState("");

    useEffect(() => {
        fetch('http://192.168.1.65:3001/logReg') // Cambia la URL por la dirección de tu servidor backend
            .then(response => response.json())
            .then(data => {
                setLoginText(data.login);
                setRegisterText(data.register);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Fondo>
            <View style={styles.container}>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('LoginPage')}>
                    <Text style={styles.buttonText}>{loginText}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>{registerText}</Text>
                </TouchableOpacity>
            </View>
        </Fondo>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50,
    },
    button: {
        width: 247,
        height: 60,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginVertical: 10,
        marginBottom: 40,
        marginTop: 10,
    },
    buttonText: {
        color: "black",
        fontSize: 24,
    },
});
