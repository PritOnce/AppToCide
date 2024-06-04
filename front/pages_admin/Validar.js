import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { RadioButton } from 'react-native-paper';

import Fondo from "../Maquetas/Fondo";
import { borders, colors, fontSizes, sizes } from '../constantes/themes';

import NavbarAdmin from "../Maquetas/NavbarAdmin";
import { useState } from "react";
export default function Validar() {
    const [checked, setChecked] = useState('');

    const handlePress = (value) => {
        setChecked(prev => prev === value ? '' : value);
    }

    return (
        <Fondo>
            <NavbarAdmin />

            <View style={styles.container}>
                <Text style={{ fontSize: fontSizes.buttonsLabels }}>FACTURAS</Text>

                <View style={styles.groupLabel}>
                    <Text style={styles.labels}>FECHA</Text>
                    <Text style={styles.labels}>VALIDAR</Text>
                </View>
                <ScrollView style={styles.invoices}>
                    <View style={styles.itemInvoice}>
                        <Text>2021-06-01</Text>
                        <RadioButton
                            value="first"
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => handlePress('first')}
                        />
                    </View>
                </ScrollView>
            </View>

        </Fondo >
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
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 30,
        width: sizes.navbarWidth,
        height: sizes.navbarHeight,
        marginTop: 20,
        borderRadius: borders.mediumRadious,
        borderWidth: borders.smallRadiousWith,
        borderColor: borders.borderColor,
        backgroundColor: colors.primary,
    },
    labels: {
        fontSize: fontSizes.subLabels,
        padding: 5,
    },
    invoices: {
        width: sizes.navbarWidth,
        borderRadius: borders.mediumRadious,
        borderWidth: borders.smallRadiousWith,
        borderColor: borders.borderColor,
        backgroundColor: colors.primary,
        paddingEnd: 10,
        paddingStart: 10,
        paddingBottom: 10,
        flexGrow: 1
    },
    itemInvoice: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        borderTopWidth: borders.smallRadiousWith,
        borderBottomWidth: borders.smallRadiousWith,
    }
})