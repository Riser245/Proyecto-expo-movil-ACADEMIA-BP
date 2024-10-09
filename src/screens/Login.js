import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import Input from '../components/Inputs/Inputs';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';
import CustomAlertExito from '../components/CustomAlert/CustomAlertSuccess';
import CustomAlertError from '../components/CustomAlert/CustomAlertError';

export default function Login({ navigation }) {
    const ip = Constantes.IP;
    const [isContra, setIsContra] = useState(true);
    const [usuario, setUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    //Método que se ejecuta al iniciar la aplicación,
    //Cerrando la sesión del usuario si no está activa
    //También la utilizamos para validar si la dirección IP del dispositivo es la correcta
    const validarSesion = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status === 1) {
                cerrarSesion();
                
            } else {
                
                return;
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al validar la sesión');
        }
    };

    //Método para cerrar sesión
    const cerrarSesion = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=logOut`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                setAlertMessage('Sesión cerrada con éxito');
                setSuccessVisible(true);  // Muestra la alerta de éxito
            } else {
                setAlertMessage('No se pudo cerrar la sesión');
                setErrorVisible(true);  // Muestra la alerta de error
            }
        } catch (error) {
            
            setAlertMessage('No se pudo cerrar la sesión. Error.');
            setErrorVisible(true);  // Muestra la alerta de error
        }
    };

    //Método para validar el usuario y la contraseña ingresada
    const handlerLogin = async () => {

        setSuccessVisible(false);
            setErrorVisible(false);
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
                setAlertMessage('¡Inicio de sesión exitoso!');
                setSuccessVisible(true);  // Muestra la alerta de éxito

                setTimeout(() => {
                    navigation.navigate('Home');
                }, 1000);
                
            } else {
                setAlertMessage('Error al iniciar sesión');
                setErrorVisible(true);  // Muestra la alerta de error
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

            <CustomAlertError
                visible={errorVisible}
                onClose={() => setErrorVisible(false)}
                message={alertMessage}
            />
            <CustomAlertExito
                visible={successVisible}
                onClose={() => setSuccessVisible(false)}
                message={alertMessage}
            />

                <Text style={styles.texto}>Iniciar Sesión</Text>
                <Input
                    placeHolder='Correo'
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
        fontSize: 15,
        marginTop: 10,
    },
});
