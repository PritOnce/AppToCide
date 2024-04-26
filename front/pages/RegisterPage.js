import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Switch,
  ScrollView,
} from "react-native";

export default function RegisterPage() {
  const [isEnable, setIsEnable] = useState(false);
  const toggleSwitch = () => setIsEnable((previousState) => !previousState);

  const [isEnableCuota, setIsEnableCuota] = useState(false);
  const toggleSwitchCuota = () =>
    setIsEnableCuota((previousState) => !previousState);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.data}>
          <Text style={styles.label}>DATOS CUENTA</Text>
          <TextInput style={styles.input} placeholder="Usuario:" />
          <TextInput
            style={styles.input}
            placeholder="Contraseña:"
            secureTextEntry
          />
        </View>

        <View style={styles.data}>
          <Text style={styles.label}>DATOS ESTUDIANTE</Text>
          <TextInput style={styles.input} placeholder="Nombres:" />
          <TextInput style={styles.input} placeholder="Apellidos:" />
          <TextInput style={styles.input} placeholder="Dirrección:" />
          <View style={styles.hugs}>
            <TextInput style={styles.input} placeholder="Fecha nacimiento:" />
            <TextInput style={styles.input} placeholder="DNI:" />
          </View>
          <TextInput style={styles.input} placeholder="Curso a Cursar:" />
          <TextInput style={styles.input} placeholder="Curso Anterior:" />
          <View style={styles.switch}>
            <View style={styles.switchData}>
              <Text>Cuota Cide</Text>
              <Switch
                trackColor={{ false: "grey", true: "black" }}
                onValueChange={toggleSwitch}
                value={isEnable}
                thumbColor={isEnable ? "green" : "black"}
              />
            </View>
            <View>
              <Text>Seguro Médico</Text>
              <Switch
                trackColor={{ false: "grey", true: "black" }}
                onValueChange={toggleSwitchCuota}
                value={isEnableCuota}
                thumbColor={isEnableCuota ? "green" : "black"}
              />
            </View>
          </View>
        </View>

        <View style={styles.data}>
          <Text>DATOS CONTACTO</Text>
          <TextInput style={styles.input} placeholder="Nombres:" />
          <TextInput style={styles.input} placeholder="Apellidos:" />
          <TextInput style={styles.input} placeholder="DNI:" />
          <TextInput style={styles.input} placeholder="Email:" />
        </View>

        <View style={styles.data}>
          <Text>DATOS BANCARIOS</Text>
          <TextInput style={styles.input} placeholder="IBAN:" />
          <TextInput style={styles.input} placeholder="ENTIDAD:" />
          <TextInput style={styles.input} placeholder="OFICINA:" />
          <TextInput style={styles.input} placeholder="DC:" />
          <TextInput style={styles.input} placeholder="Nª CUENTA:" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2C8344",
  },
  container: {
    backgroundColor: "#2C8344",
    alignItems: "center",
    justifyContent: "center",
  },
  data: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "black",
    display: "flex",
    marginBottom: 20,
  },
  input: {
    width: 280,
    height: 40,
    color: "black",
    fontSize: 16,
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 3,
    marginVertical: 10,
    padding: 10,
  },
  label: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
});
