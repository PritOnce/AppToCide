import React, { useEffect, useState } from "react";
import Fondo from "../Maquetas/Fondo";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

export default function LogRegPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://172.16.161.76:3001')
          .then(response => response.json())
          .then(data => setData(data.message))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    return (
        <Fondo>
            <Text>HOLA</Text>
        </Fondo>
    )
}
