import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

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
      <Image
        source={require('../assets/logoCide.png')}
        style={styles.logo}
      />
      <View style={styles.square}>
        <Text style={styles.title}>{!data ? 'Cargando...' : data}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.btn_text}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    marginTop: 70,
    aspectRatio: 1,
    position: 'absolute',
    top: 0,
  },
  title: {
    fontSize: 36,
    marginBottom: 16,
    marginTop: 100,
    marginLeft: 20,
    color: 'white',
  },
  square: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#2C8344',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 100,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 84,
    height: 40,
    marginLeft: 300,
    marginTop: 80,
  },
  btn_text:{
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
