import React from 'react';
import StartPage from '../pages/StartPage';
import LogRegPage from '../pages/LogRegPage';
import LoginPage from '../pages/LoginPage';
import ResetPassword from '../pages/ResetPassword';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from '../pages/RegisterPage';
import MenuPage from '../pages/MenuPage';
import FacturasPage from '../pages/FacturasPage';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
    <Stack.Navigator initialRouteName='StartPage'>
        <Stack.Screen 
            name="StartPage" 
            component={StartPage}
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="LogRegPage" 
            component={LogRegPage} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="LoginPage" 
            component={LoginPage} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="ResetPassword" 
            component={ResetPassword} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="RegisterPage" 
            component={RegisterPage} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="MenuPage" 
            component={MenuPage} 
            options={{ headerShown: false }} 
        />
        <Stack.Screen 
            name="FacturasPage" 
            component={FacturasPage} 
            options={{ headerShown: false }} 
        />
        {/* Agrega más pantallas según sea necesario */}
    </Stack.Navigator>
</NavigationContainer>
    );
}
