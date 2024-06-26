import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { borders } from '../constantes/themes';

const BurgerMenu = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const navigateToScreen = (screenName) => {
        toggleMenu();
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                <Text style={styles.menuButtonText}>☰</Text>
            </TouchableOpacity>
            {menuVisible && (
                <View style={styles.menu}>
                    <TouchableOpacity onPress={() => navigateToScreen('MenuPage')}>
                        <Text>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToScreen('FacturasPage')}>
                        <Text>Facturas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToScreen('PerfilPage')}>
                        <Text>Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToScreen('MaterialPage')}>
                        <Text>Material</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigateToScreen('ServiciosPage')}>
                        <Text>Servicios</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    menuButton: {
        padding: 10,
        borderRadius: borders.mediumRadious,
        borderWidth: borders.smallRadiousWith,
        marginBottom: 10,
        marginRight: 165,
    },
    menuButtonText: {
        fontSize: 20,
    },
    menu: {
        position: 'absolute',
        top: 30, // Ajusta según tu diseño
        right: 10, // Ajusta según tu diseño
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginTop: 20,
        marginRight: 155,
    },
});

export default BurgerMenu;
