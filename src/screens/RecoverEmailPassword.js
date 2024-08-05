import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import Input from '../components/Inputs/Inputs';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';
import enviarEmail from '../utils/Email';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecuperarClaveCorreo({ navigation }) {
  const ip = Constantes.IP;
  const [correo, setCorreo] = useState('');

  const enviarCodigo = async () => {
    const FORM = new FormData();
    FORM.append('IngreseCorreo', correo);
    try {
      const response = await fetch(`${ip}/OinosDeLaVid/api/services/public/cliente.php?action=checkCorreo`, {
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
          navigation.navigate('RecuperarClaveCodigo', { correo: EMAIL });
        } else {
          Alert.alert('Error', 'Ocurrió un error al enviar el correo');
        }
      } else {
        Alert.alert('Error', `Error en la solicitud: ${DATA.status}`);
      }
    } catch (error) {
      console.error('Error desde Catch', error);
      Alert.alert('Error', `Ocurrió un error: ${error.message}`);
    }
  };

  const Regresar = () => {
    navigation.navigate('Login');
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

  return (
    <ImageBackground source={require('../imagenes/inicio.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.texto}>Iniciar Sesión</Text>
        <Input
          placeHolder='micorreo@gmail.com'
          setValor={correo}
          setTextChange={setCorreo}
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
});