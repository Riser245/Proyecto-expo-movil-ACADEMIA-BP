import React from "react";
import {ImageBackground, StyleSheet} from "react-native";

const LoginScreen = () => {
    return (
      <ImageBackground
        source={require('../imagenes/inicio.png')}
        style={styles.backgroundImage}
      >
        {/* Contenido de tu componente */}
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // o 'contain' para ajustar la imagen al tamaño del contenedor
    },
  });
  

export default LoginScreen;
 
