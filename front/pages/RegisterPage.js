import { IP_MAIN } from '@env'

import { useNavigation } from '@react-navigation/native';

import { useRegisterState, useErrorStates } from '../states/index.js';
import Form from '../Maquetas/Form.js';
import ErrorModal from '../Maquetas/ErrorModal.js';

export default function RegisterPage() {
  const navigation = useNavigation();

  const { username, setUsername, password, setPassword,
    names, setNames, surnames, setSurnames,
    address, setAddress, birthDate, setBirthDate,
    dni, setDni, grade, setGrade,
    pastGrade, setPastGrade, contactNames, setContactNames,
    contactSurnames, setContactSurnames, contactDni, setContactDni,
    contactEmail, setContactEmail, seguro, setSeguro, cuotaCide, setCuotaCide, 
    familiaNumerosa, setFamiliaNumerosa, IBAN, setIBAN, entidad, setEntidad,
    oficina, setOficina, DC, setDC, numberAccount, setNumberAccount,
  } = useRegisterState();


  const {
    errorModalVisible,
    setErrorModalVisible,
    errorMessage,
    setErrorMessage
  } = useErrorStates();

  const handleRegister = async () => {

    if (
      !username ||
      !password ||
      !names ||
      !surnames ||
      !address ||
      !birthDate ||
      !dni ||
      !grade ||
      !contactNames ||
      !contactSurnames ||
      !contactDni ||
      !contactEmail ||
      !IBAN ||
      !entidad ||
      !oficina ||
      !DC ||
      !numberAccount ||
      !seguro ||
      !cuotaCide ||
      !familiaNumerosa
    ) {
      setErrorMessage("Por favor, complete todos los campos.");
      setErrorModalVisible(true);
      return; // Evita continuar con el envío de la solicitud al backend
    }

    try {
      const response = await fetch(IP_MAIN + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, password,
          names, surnames, address, birthDate, dni, grade, pastGrade,
          setPastGrade, contactNames, contactSurnames, contactDni,
          contactEmail, seguro, cuotaCide, familiaNumerosa, IBAN, entidad, oficina, DC, numberAccount
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
    <>
      <Form
        setUsername={setUsername}
        setPassword={setPassword}
        setNames={setNames}
        setSurnames={setSurnames}
        setAddress={setAddress}
        setBirthDate={setBirthDate}
        setDni={setDni}
        setGrade={setGrade}
        setPastGrade={setPastGrade}
        setContactNames={setContactNames}
        setContactSurnames={setContactSurnames}
        setContactDni={setContactDni}
        setContactEmail={setContactEmail}
        setSeguro={setSeguro}
        setCuotaCide={setCuotaCide}
        setFamiliaNumerosa={setFamiliaNumerosa}
        setIBAN={setIBAN}
        setEntidad={setEntidad}
        setOficina={setOficina}
        setDC={setDC}
        setNumberAccount={setNumberAccount}
        handleRegister={handleRegister}
      />
      <ErrorModal
        visible={errorModalVisible}
        message={errorMessage}
        onClose={() => setErrorModalVisible(false)}
      />
    </>

  );
}