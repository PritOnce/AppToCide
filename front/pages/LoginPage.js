import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import Fondo from "../Maquetas/Fondo";
import { useNavigation } from '@react-navigation/native';
import ErrorModal from '../Maquetas/ErrorModal'; // Importar el componente ErrorModal

export default function LoginPage() {
    const navigation = useNavigation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        try {
            // Tu código de autenticación...
            // Si la autenticación falla, establece el mensaje de error y muestra el modal
            setErrorMessage("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
            setErrorModalVisible(true);
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
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>
            {/* Mostrar el modal de error si está visible */}
            <ErrorModal
                visible={errorModalVisible}
                message={errorMessage}
                onClose={() => setErrorModalVisible(false)}
            />
        </Fondo>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: 320,
        height: 50,
        fontSize: 20,
        backgroundColor: "white",
        marginVertical: 10,
        borderWidth: 3,
        borderRadius: 10,
        borderColor: "black",
        padding: 20,
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginVertical: 10,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 10,
    },
    buttonText: {
        color: "black",
        fontSize: 18,
    },
});
