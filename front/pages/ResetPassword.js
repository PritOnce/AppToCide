import {IP_MAIN} from '@env'

import React, { useEffect, useState } from "react";
import Fondo from "../Maquetas/Fondo";
import { Text, StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import { borders, colors, fontSizes, sizes } from '../constantes/themes';


export default function ResetPassword() {

    const [passText, setPassText] = useState("");
    const [repitPassText, setRepitPassText] = useState("");

    useEffect(() => {
        fetch(IP_MAIN+'/restartPassw')
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
    },
    input: {
        width: sizes.mainWith,
        height: sizes.mainHeight,
        fontSize: fontSizes.subLabels,
        backgroundColor: colors.primary,
        marginVertical: 10,
        borderWidth: borders.bigRadiousWith,
        borderRadius: borders.bigRadious,
        borderColor: colors.text,
        padding: 20
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
        color: colors.text,
        fontSize: fontSizes.subTitlesCamps,
    },
});