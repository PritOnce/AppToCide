import { View, Image, StyleSheet } from "react-native";

export default function Fondo({children}) {
  return (
    <>
      <View style={styles.container}>
        <Image source={require("../assets/logoCide.png")} style={styles.logo} />
        <View style={styles.square}>
          {children}
        </View>
      </View>
    </>
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
    square: {
      width: '100%',
      aspectRatio: 1,
      backgroundColor: '#2C8344',
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 100,
    }
  });