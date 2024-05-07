import React, { useState } from "react";

export const useRegisterState = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [names, setNames] = useState("");
  const [surnames, setSurnames] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [dni, setDni] = useState("");
  const [grade, setGrade] = useState("");
  const [anteriorCentro, setanteriorCentro] = useState("");
  const [contactNames, setContactNames] = useState("");
  const [contactSurnames, setContactSurnames] = useState("");
  const [contactDni, setContactDni] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [seguro, setSeguro] = useState(true);
  const [cuotaCide, setCuotaCide] = useState(true);
  const [familiaNumerosa, setFamiliaNumerosa] = useState(true);

  const [IBAN, setIBAN] = useState("");
  const [entidad, setEntidad] = useState("");
  const [oficina, setOficina] = useState("");
  const [DC, setDC] = useState("");
  const [numberAccount, setNumberAccount] = useState("");

  return {
    username,
    setUsername,
    password,
    setPassword,
    names,
    setNames,
    surnames,
    setSurnames,
    address,
    setAddress,
    birthDate,
    setBirthDate,
    dni,
    setDni,
    grade,
    setGrade,
    anteriorCentro,
    setanteriorCentro,
    contactNames,
    setContactNames,
    contactSurnames,
    setContactSurnames,
    contactDni,
    setContactDni,
    contactEmail,
    setContactEmail,
    seguro,
    setSeguro,
    cuotaCide,
    setCuotaCide,
    familiaNumerosa,
    setFamiliaNumerosa,
    IBAN,
    setIBAN,
    entidad,
    setEntidad,
    oficina,
    setOficina,
    DC,
    setDC,
    numberAccount,
    setNumberAccount,
  };
};
