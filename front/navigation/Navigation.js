import React from 'react';
import StartPage from '../pages/StartPage';
import LogRegPage from '../pages/LogRegPage';
import LoginPage from '../pages/LoginPage';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='StartPage'>
                <Stack.Screen 
                    name="StartPage" 
                    component={StartPage} 
                    options={{ headerTitle: "", headerBackVisible: true }} 
                />
                <Stack.Screen 
                    name="LogRegPage" 
                    component={LogRegPage} 
                    options={{ headerTitle: "", headerBackVisible: true }} 
                />
                <Stack.Screen 
                    name="LoginPage" 
                    component={LoginPage} 
                    options={{ headerTitle: "", headerBackVisible: true }} 
                />
                {/* Agrega más pantallas según sea necesario */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
