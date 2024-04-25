import { useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import {Calendar, LocaleConfig} from 'react-native-calendars';

export default function RegisterPage() {

    const [selected, setSelected] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.account}>
                <Text style={styles.label}>DATOS CUENTA</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Usuario:" />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña:"
                    secureTextEntry
                />
            </View>

            <View style={styles.account}>
                <Text style={styles.label}>DATOS ESTUDIANTE</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombres:" />
                <TextInput
                    style={styles.input}
                    placeholder="Apellidos:"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Dirrección:"
                />
            
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C8344',
        alignItems: 'center',
        justifyContent: 'center',
    },
    account: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: 'black',
        display: 'flex',
    },
    input: {
        width: 280,
        height: 40,
        color: 'black',
        fontSize: 16,
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 3,
        marginVertical: 10,
        padding: 10,
    },
    label: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    }
})