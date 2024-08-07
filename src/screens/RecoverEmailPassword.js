import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import InputEmail from '../components/Inputs/InputEmail';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';
import enviarEmail from '../utils/Email';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecuperarClaveCorreo({ navigation }) {
  const ip = Constantes.IP;
  const [correo, setCorreo] = useState('');

  // Función para que envíe el código al correo ingresado
  const enviarCodigo = async () => {
    const FORM = new FormData();
    FORM.append('inputCorreo', correo);
    try {
      const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=checkCorreo`, { // Se manda a llamar la acción y verifica que sea el correo correcto
        method: 'POST',
        body: FORM
      });

      const responseText = await response.text();
      console.log('Response Text:', responseText);
      const DATA = JSON.parse(responseText);
      if (DATA.status) {
        console.log(DATA.status);
        const CODIGO = generateRandomCode(6);
        const EMAIL = correo;
        const NOMBRE = DATA.dataset.nombre_cliente;
        const EMAIL_ENVIADO = await enviarEmail(CODIGO, EMAIL, NOMBRE);
        if (EMAIL_ENVIADO) {
          await AsyncStorage.setItem('verificationCode', CODIGO); // Guardar el código generado
          await AsyncStorage.setItem('email', EMAIL); // Guardar el correo electrónico
          Alert.alert('Éxito', 'Se ha enviado un correo con el código de recuperación');
          navigation.navigate('VerifyCode', { correo: EMAIL });
        } else {
          Alert.alert('Error', 'Ocurrió un error al enviar el correo');
        }
      } else {
        Alert.alert('Error', `${DATA.error}`);
      }
    } catch (error) {
      console.error('Error desde Catch', error);
      Alert.alert('Error', `Ocurrió un error: ${error.message}`);
    }
  };

  // Navegación
  const Regresar = () => {
    navigation.navigate('Login');
  };

  // Genera un código aleatorio
  function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  return (
    <ImageBackground source={require('../imagenes/inicio.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.texto}>Recuperacion contraseña</Text>
        <InputEmail
          placeHolder='micorreo@gmail.com'
          setValor={correo}
          setTextChange={setCorreo}
          style={styles.inputSpacing}
        />
        <Buttons
          textoBoton='Enviar Código'
          accionBoton={enviarCodigo}
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
  inputSpacing: {
    marginTop: 20,
    width: '100%',
  },
});