import React, { useEffect, useState } from "react";
import Fondo from "../Maquetas/Fondo";
import { Text, StyleSheet, TouchableOpacity, View, TextInput } from "react-native";

import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {
    const navigation = useNavigation();

    const [userText, setUserText] = useState("");
    const [passText, setPassText] = useState("");
    const [restartText, setRestartText] = useState("");
    const [regText, setRegText] = useState("");

    useEffect(() => {
        fetch('http://172.16.26.27:3001/login')
            .then(response => response.json())
            .then(data => {
                setUserText(data.user);
                setPassText(data.contraseña);
                setRestartText(data.restart);
                setRegText(data.reg);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Fondo>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.buttonRestart} onPress={() => { navigation.navigate('ResetPassword') }}>
                    <Text style={styles.buttonRestartText}>{restartText}</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => { }}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('RegisterPage') }}>
                        <Text style={styles.buttonText}>{regText}</Text>
                    </TouchableOpacity>
                </View>
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
    input: {
        width: 320,
        height: 62,
        fontSize: 20,
        backgroundColor: "white",
        marginVertical: 10,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: "black",
        padding: 20,
    },
    buttonRestart: {
        fontSize: 16,
    },
    buttonRestartText: {
        color: "white",
    },
    button: {
        width: 150,
        height: 51,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginHorizontal: 10,
        bottom: -20,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 10,
    },
    buttonText: {
        color: "black",
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row', // Para que los botones se coloquen uno al lado del otro
    }
});
