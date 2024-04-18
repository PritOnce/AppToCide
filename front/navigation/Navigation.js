import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartPage from '../pages/StartPage'; // Ajusta la ruta a tu componente StartPage
import LogRegPage from '../pages/LogRegPage'; // Ajusta la ruta a tu componente LogRegPage

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartPage" component={StartPage} />
        <Stack.Screen name="LogRegPage" component={LogRegPage} />
        {/* Agrega más pantallas según sea necesario */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
