import { IP_MAIN } from '@env'

import React from "react";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Switch,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { colors, fontSizes, sizes, borders } from '../constantes/themes';
import { useNavigation } from '@react-navigation/native';

import { useRegisterState, useErrorStates } from '../states/index.js';

export default function RegisterPage() {
  const navigation = useNavigation();

  const { username, setUsername, password, setPassword,
    names, setNames, surnames, setSurnames,
    address, setAddress, birthDate, setBirthDate,
    dni, setDni, grade, setGrade,
    pastGrade, setPastGrade, contactNames, setContactNames,
    contactSurnames, setContactSurnames, contactDni, setContactDni,
    contactEmail, setContactEmail, IBAN, setIBAN,
    entidad, setEntidad,
    oficina, setOficina, DC, setDC, numberAccount, setNumberAccount,
  } = useRegisterState();


  const {
    errorModalVisible,
    setErrorModalVisible,
    errorMessage,
    setErrorMessage
  } = useErrorStates();

  const [isEnable, setIsEnable] = useState(false);
  const toggleSwitch = () => setIsEnable((previousState) => !previousState);

  const [isEnableCuota, setIsEnableCuota] = useState(false);
  const toggleSwitchCuota = () =>
    setIsEnableCuota((previousState) => !previousState);

  const handleLogin = async () => {
    try {
      const response = await fetch(IP_MAIN + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, password,
          names, surnames, address, birthDate, dni, grade,
          anteriorCentro, contactNames, contactSurnames, contactDni,
          contactEmail, IBAN, entidad, oficina, DC, numberAccount
        }),
      });
      const data = await response.json();
      if (response.ok) {
        navigation.navigate("MenuPage");
      } else {
        setErrorMessage(
          "Credenciales incorrectas. Por favor, inténtalo de nuevo."
        );
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.data}>
          <Text style={styles.label}>DATOS CUENTA</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario:"
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña:"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View style={styles.data}>
          <Text style={styles.label}>DATOS ESTUDIANTE</Text>
          <TextInput style={styles.input} placeholder="Nombres:" onChangeText={(text) => setNames(text)} />
          <TextInput style={styles.input} placeholder="Apellidos:" onChangeText={(text) => setSurnames(text)} />
          <TextInput style={styles.input} placeholder="Dirrección:" onChangeText={(text) => setAddress(text)} />
          <View style={styles.hugs}>
            <TextInput style={{ width: 130, height: 40, borderWidth: 2, borderColor: 'black', borderRadius: 3, paddingLeft: 10 }} placeholder="Fecha nacimiento:" onChangeText={(text) => setBirthDate(text)} />
            <TextInput style={{ width: 130, height: 40, borderWidth: 2, borderColor: 'black', borderRadius: 3, marginLeft: 20, paddingLeft: 10 }} placeholder="DNI:" onChangeText={(text) => setDni(text)} />
          </View>
          <TextInput style={styles.input} placeholder="Curso a Cursar:" onChangeText={(text) => setGrade(text)}/>
          <TextInput style={styles.input} placeholder="Colegio Anterior:" />
          <View style={styles.switch}>
            <View style={styles.switchData}>
              <Text>Cuota{"\n"}Cide</Text>
              <Switch
                trackColor={{ false: "grey", true: "black" }}
                onValueChange={toggleSwitch}
                value={isEnable}
                thumbColor={isEnable ? "green" : "black"}
              />
            </View>
            <View style={styles.switchData}>
              <Text>Seguro{"\n"}Médico</Text>
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

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
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
    width: sizes.inputFromWith,
    height: sizes.inputFormHeight,
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
  hugs: {
    flexDirection: 'row'
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  switchData: {
    borderWidth: borders.bigRadiousWith,
    borderColor: colors.text,
    borderRadius: borders.bigRadious,
    flexDirection: 'column',
    padding: 5,
    marginHorizontal: 10,
    width: 116,
    height: 100,
    alignItems: 'center',
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
  },
  buttonText: {
    color: colors.text,
    fontSize: fontSizes.subTitlesCamps,
  },
});
