import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Fondo from "../Maquetas/Fondo";
import { useNavigation } from '@react-navigation/native';

export default function StartPage() {
  const [data, setData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://192.168.1.65:3001")
      .then((response) => response.json())
      .then((data) => setData(data.message))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Fondo>
      <Text style={styles.title}>{data}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LogRegPage')}>
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 50,
  },
  button: {
    width: 84,
    height: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});
