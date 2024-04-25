import React, { useEffect, useState } from "react";
import Fondo from "../Maquetas/Fondo";
import { Text, StyleSheet, TouchableOpacity, View, TextInput } from "react-native";


export default function ResetPassword() {

    const [passText, setPassText] = useState("");
    const [repitPassText, setRepitPassText] = useState("");

    useEffect(() => {
        fetch('http://172.16.26.27:3001/restartPassw')
            .then(response => response.json())
            .then(data => {
                setPassText(data.newContaseña);
                setRepitPassText(data.repitNewContaseña);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Fondo>
            <View style={styles.container}>

                <TextInput
                    style={styles.input}
                    placeholder={passText}
                />
                <TextInput
                    style={styles.input}
                    placeholder={repitPassText}
                />

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Actualizar</Text>
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
        marginVertical: 25,
    },
    button: {
        width: 150,
        height: 51,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 3,
        borderColor: "black",
        marginVertical: 25,
    },
    buttonText: {
        color: "black",
        fontSize: 24,
    },
});