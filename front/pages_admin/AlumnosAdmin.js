import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

import Fondo from "../Maquetas/Fondo";
import { borders, colors, fontSizes, sizes } from '../constantes/themes';

import NavbarAdmin from "../Maquetas/NavbarAdmin";
export default function AlumnosAdmin() {

    const [menuVisible, setMenuVisible] = useState(false);
    const [searchText, setSearchText] = useState(''); // Nuevo estado para almacenar el texto de búsqueda

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleSearch = () => {
        console.log(searchText); // Reemplaza esto con tu función de búsqueda
    };
    return (
        <Fondo>
            <NavbarAdmin />

            <View style={styles.container}>
                <Text style={{ fontSize: fontSizes.buttonsLabels }}>ALUMNOS</Text>

                <View style={styles.groupLabel}>
                    <View style={{
                        flexDirection: 'row', borderWidth: borders.smallRadiousWith,
                        borderRadius: borders.smallRadious, paddingHorizontal: 5
                    }}>
                        <TextInput
                            style={styles.buttons}
                            placeholder="DNI"
                            onChangeText={text => setSearchText(text)} // Actualiza el estado cuando el texto cambia
                        />
                        <TouchableOpacity onPress={handleSearch} style={styles.enterButton}>
                            <Text style={{ padding: 5 }}>🔎</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.data}>
                    <View style={styles.menuBtn}>
                        <Text style={styles.txtBtn}>NOMBRE:</Text>
                        <Text style={styles.txtBtn}>NAVPREET ESTUARDO</Text>
                    </View>
                    <View style={styles.menuBtn}>
                        <Text style={styles.txtBtn}>NOMBRE:</Text>
                        <Text style={styles.txtBtn}>NAVPREET ESTUARDO</Text>
                    </View>
                    <View style={styles.menuBtn}>
                        <Text style={styles.txtBtn}>NOMBRE:</Text>
                        <Text style={styles.txtBtn}>NAVPREET ESTUARDO</Text>
                    </View>
                    <View style={styles.menuBtn}>
                        <Text style={styles.txtBtn}>NOMBRE:</Text>
                        <Text style={styles.txtBtn}>NAVPREET ESTUARDO</Text>
                    </View>
                    <View style={styles.menuBtn}>
                        <Text style={styles.txtBtn}>NOMBRE:</Text>
                        <Text style={styles.txtBtn}>NAVPREET ESTUARDO</Text>
                    </View>
                    <View style={styles.menuBtn}>
                        <Text style={styles.txtBtn}>NOMBRE:</Text>
                        <Text style={styles.txtBtn}>NAVPREET ESTUARDO</Text>
                    </View>
                    <View style={styles.menuBtn}>
                        <Text style={styles.txtBtn}>NOMBRE:</Text>
                        <Text style={styles.txtBtn}>NAVPREET ESTUARDO</Text>
                    </View>
                    <View style={styles.menuBtn}>
                        <Text style={styles.txtBtn}>NOMBRE:</Text>
                        <Text style={styles.txtBtn}>NAVPREET ESTUARDO</Text>
                    </View>
                </ScrollView>
            </View>
        </Fondo>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: -600,
    },
    groupLabel: {
        flexDirection: "row",
        justifyContent: "space-around", // Cambia esto
        alignItems: "center",
        width: sizes.navbarWidth,
        height: sizes.navbarHeight,
        marginTop: 20,
        borderRadius: borders.mediumRadious,
        borderWidth: borders.smallRadiousWith,
        borderColor: borders.borderColor,
        backgroundColor: colors.primary,
    },
    txtBtn: {
        fontSize: fontSizes.subLabels
    },
    data: {
        width: sizes.navbarWidth,
        borderRadius: borders.mediumRadious,
        borderWidth: borders.smallRadiousWith,
        borderColor: borders.borderColor,
        backgroundColor: colors.primary,
        paddingEnd: 10,
        paddingStart: 10,
        paddingBottom: 10,
        flexGrow: 1,
        justifyContent: 'center', // Añade esto
        alignItems: 'center', // Añade esto
    },
    menuBtn: {
        width: 224,
        height: 82,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: borders.bigRadious,
        borderWidth: borders.bigRadiousWith,
        marginVertical: 10, // Ajusta esto a la cantidad de espacio que desees
    } 
})