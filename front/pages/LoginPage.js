import React, { useEffect, useState } from "react";
import Fondo from "../Maquetas/Fondo";
import { Text, StyleSheet, TouchableOpacity, View, TextInput, Alert } from "react-native";

import { useNavigation } from '@react-navigation/native';

export default function LoginPage() {
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.0.48:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            // Aquí puedes manejar la respuesta del backend, por ejemplo, mostrar un mensaje de éxito o error.
            if (response.ok) {
                // Acción a realizar en caso de éxito, por ejemplo, navegación a otra pantalla.
                navigation.navigate('MenuPage');
            } else {
                // Acción a realizar en caso de error, por ejemplo, mostrar un mensaje de error.
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Fondo>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    onChangeText={text => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity style={styles.buttonRestart} onPress={() => { navigation.navigate('ResetPassword') }}>
                    <Text style={styles.buttonRestartText}>He olvidado la contaseña</Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={ handleLogin }>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('RegisterPage') }}>
                        <Text style={styles.buttonText}>Registrase</Text>
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
