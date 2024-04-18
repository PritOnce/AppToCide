import React, { useState, useEffect } from "react";
import Fondo from "../Maquetas/Fondo";

import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function StartPage() {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('LogRegPage');
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://172.16.161.76:3001")
      .then((response) => response.json())
      .then((data) => setData(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Fondo>
      <Text style={styles.title}>{data}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.btn_text}>ENTRAR</Text>
      </TouchableOpacity>
    </Fondo>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    marginTop: 70,
    marginLeft: 30,
    textAlign: "left",
    color: "white"
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
    marginTop: 90
  },
  btn_text:{
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
