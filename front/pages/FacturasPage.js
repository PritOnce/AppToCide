import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { IP_MAIN } from '@env'

import Fondo from "../Maquetas/Fondo";
import { borders, colors, fontSizes, sizes } from '../constantes/themes';

import Navbar from "../Maquetas/Navbar"
import { useEffect, useState } from "react";
export default function FacturasPage() {

    return (
        <Fondo>
            <Navbar />

            <View style={styles.container}>
                <Text style={{ fontSize: fontSizes.buttonsLabels }}>Facturas</Text>

                <View style={styles.groupLabel}>
                    <Text style={styles.labels}>FECHA</Text>
                    <Text style={styles.labels}>VER</Text>
                </View>
                <ScrollView style={styles.invoices}>
                    <View style={styles.itemInvoice}>
                        <Text>2021-06-01</Text>
                        <TouchableOpacity>
                            <Image source={require("../assets/playIcono.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemInvoice}>
                        <Text>2021-06-01</Text>
                        <TouchableOpacity>
                            <Image source={require("../assets/playIcono.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemInvoice}>
                        <Text>2021-06-01</Text>
                        <TouchableOpacity>
                            <Image source={require("../assets/playIcono.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemInvoice}>
                        <Text>2021-06-01</Text>
                        <TouchableOpacity>
                            <Image source={require("../assets/playIcono.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemInvoice}>
                        <Text>2021-06-01</Text>
                        <TouchableOpacity>
                            <Image source={require("../assets/playIcono.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemInvoice}>
                        <Text>2021-06-01</Text>
                        <TouchableOpacity>
                            <Image source={require("../assets/playIcono.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemInvoice}>
                        <Text>2021-06-01</Text>
                        <TouchableOpacity>
                            <Image source={require("../assets/playIcono.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemInvoice}>
                        <Text>2021-06-01</Text>
                        <TouchableOpacity>
                            <Image source={require("../assets/playIcono.png")} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemInvoice}>
                        <Text>2021-06-01</Text>
                        <TouchableOpacity>
                            <Image source={require("../assets/playIcono.png")} />
                        </TouchableOpacity>
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