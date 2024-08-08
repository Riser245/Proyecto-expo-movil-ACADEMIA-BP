import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import Input from '../components/Inputs/Inputs';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Actualizar({ navigation }) {
    const ip = Constantes.IP;
    const [claveNueva, setClaveNueva] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');
    const [correo, setCorreo] = useState('');

    useEffect(() => {
        const obtenerDatos = async () => {
          const storedEmail = await AsyncStorage.getItem('email');
          if (storedEmail) {
            setCorreo(storedEmail);
          }
        };
        obtenerDatos();
      }, []);

 
  

  // Navegación
  const Regresar = () => {
    navigation.navigate('VerifyCode');
  };


  return (
    <ImageBackground source={require('../imagenes/inicio.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.texto}>Cambiar contraseña</Text>
        <Input
          placeHolder='Contraseña'
          setValor={claveNueva}
          setTextChange={setClaveNueva}
        />
        <Input
          placeHolder='Confirmar contraseña'
          setValor={confirmarClave}
          setTextChange={setConfirmarClave}
        />
        <Buttons
          textoBoton='Aceptar'
          accionBoton={Update}
        />
        <Buttons
          textoBoton='Regresar'
          accionBoton={Regresar}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: '#322C2B',
    fontWeight: '900',
    fontSize: 20,
    marginBottom: 20,
  },
  textRegistrar: {
    color: '#322C2B',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 10,
  },
});
