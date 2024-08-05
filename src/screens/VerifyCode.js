import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import Input from '../components/Inputs/Inputs';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';
import enviarEmail from '../utils/Email';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Verificar({ navigation }) {
    const ip = Constantes.IP;
    const [codigoIngresado, setCodigoIngresado] = useState('');
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

    const VerificarCodigo = async () => {
        try {
            const codigo = await AsyncStorage.getItem('verificationCode');
        if (codigo === codigoIngresado) {
            Alert.alert('Éxito', 'Código correcto');
            navigation.navigate('UpdatePassword');
        } else {
            Alert.alert('Error', 'Código incorrecto');
        }
    }
    catch (error) {
        console.error('Error desde Catch', error);
        Alert.alert('Error', `Ocurrió un error: ${error.message}`);
    }
};

const ReenviarCodigo = async () => {
    const CODIGO = generateRandomCode(6);
    const EMAIL = correo;
    const EMAIL_ENVIADO = await enviarEmail(CODIGO, EMAIL);
    if (EMAIL_ENVIADO) {
        await AsyncStorage.setItem('verificationCode', CODIGO); // Guardar el código generado
        Alert.alert('Éxito', 'Se ha vuelto a enviar un correo con el código de recuperación');
    } else {
        Alert.alert('Error', 'Ocurrió un error al enviar el correo');
    }
};
function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const Regresar = () => {
    navigation.navigate('RecoverEmailPassword');
  };

  return (
    <ImageBackground source={require('../imagenes/inicio.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.texto}>Verificar codigo</Text>
        <Input
          placeHolder='xxxxxx'
          setValor={codigoIngresado}
          setTextChange={setCodigoIngresado}
        />
        <Buttons
          textoBoton='Verificar'
          accionBoton={VerificarCodigo}
        />
        <Buttons
          textoBoton='Reenviar Código'
          accionBoton={ReenviarCodigo}
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
