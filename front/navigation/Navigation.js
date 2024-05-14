import React from 'react';
import StartPage from '../pages/StartPage';
import LogRegPage from '../pages/LogRegPage';
import LoginPage from '../pages/LoginPage';
import ResetPassword from '../pages/ResetPassword';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPage from '../pages/RegisterPage';
import MenuPage from '../pages/MenuPage';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='StartPage'>
                <Stack.Screen 
                    name="StartPage" 
                    component={StartPage}
                    options={{ headerTitle: "", headerBackVisible: true, headerStyle: {backgroundColor: 'white'}}} 
                />
                <Stack.Screen 
                    name="LogRegPage" 
                    component={LogRegPage} 
                    options={{ headerTitle: "", headerBackVisible: true, headerStyle: {backgroundColor: 'white'}, headerLeft: null }} 
                />
                <Stack.Screen 
                    name="LoginPage" 
                    component={LoginPage} 
                    options={{ headerTitle: "", headerBackVisible: true, headerStyle: {backgroundColor: 'white'}, headerLeft: null }} 
                />
                <Stack.Screen 
                    name="ResetPassword" 
                    component={ResetPassword} 
                    options={{ headerTitle: "", headerBackVisible: true, headerStyle: {backgroundColor: 'white'}, headerLeft: null }} 
                />
                <Stack.Screen 
                    name="RegisterPage" 
                    component={RegisterPage} 
                    options={{ headerTitle: "", headerBackVisible: true, headerStyle: {backgroundColor: '#2C8344'}, headerLeft: null }} 
                />
                <Stack.Screen 
                    name="MenuPage" 
                    component={MenuPage} 
                    options={{ headerTitle: "", headerBackVisible: true, headerStyle: {backgroundColor: 'white'}, headerLeft: null }} 
                />
                {/* Agrega más pantallas según sea necesario */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
