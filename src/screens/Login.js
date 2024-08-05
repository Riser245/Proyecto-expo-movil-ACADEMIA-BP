import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import Input from '../components/Inputs/Inputs';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';

export default function Login({ navigation }) {
  const ip = Constantes.IP;
  const [isContra, setIsContra] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [contrasenia, setContrasenia] = useState('');

  const validarSesion = async () => {
    try {
      const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status === 1) {
        cerrarSesion();
        console.log("Se eliminó la sesión");
      } else {
        console.log("No hay sesión activa");
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al validar la sesión');
    }
  };

  const cerrarSesion = async () => {
    try {
      const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        console.log("Sesión Finalizada");
      } else {
        console.log('No se pudo eliminar la sesión');
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al cerrar sesión');
    }
  };

  const handlerLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('correoCliente', usuario);
      formData.append('claveCliente', contrasenia);

      const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=logIn`, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.status) {
        setContrasenia('');
        setUsuario('');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error sesión', data.error);
      }
    } catch (error) {
      console.error(error, "Error desde Catch");
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
    }
  };

  const irRegistrar = () => {
    navigation.navigate('SignUp');
  };

  const irCorreo = () => {
    navigation.navigate('RecoverEmailPassword');
  };

  useEffect(() => {
    validarSesion();
  }, []);

  return (
    <ImageBackground source={require('../imagenes/inicio.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.texto}>Iniciar Sesión</Text>
        <Input
          placeHolder='Usuario'
          setValor={usuario}
          setTextChange={setUsuario}
        />
        <Input
          placeHolder='Contraseña'
          setValor={contrasenia}
          setTextChange={setContrasenia}
          contra={isContra}
        />
        <Buttons
          textoBoton='Iniciar Sesión'
          accionBoton={handlerLogin}
        />
        <TouchableOpacity onPress={irRegistrar}>
          <Text style={styles.textRegistrar}>¿No tienes cuenta? Regístrate aquí</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={irCorreo}>
          <Text style={styles.textRegistrar}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
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
