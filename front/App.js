import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.65:3001')
      .then(response => response.json())
      .then(data => setData(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  return (
    <View style={styles.container}>
      <Text>Inicio</Text>
      <Text>{!data ? 'Cargando...' : <Text style={styles.message}>{data}</Text>}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
