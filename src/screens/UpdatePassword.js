import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import Input from '../components/Inputs/Inputs';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomAlertError from '../components/CustomAlert/CustomAlertError';
import CustomAlertExito from '../components/CustomAlert/CustomAlertSuccess';

export default function Actualizar({ navigation }) {
    const ip = Constantes.IP;
    const [claveNueva, setClaveNueva] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');
    const [correo, setCorreo] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const obtenerDatos = async () => {
            const storedEmail = await AsyncStorage.getItem('email');
            if (storedEmail) {
                setCorreo(storedEmail);
            }
        };
        obtenerDatos();
    }, []);

    // Función para actualizar la contraseña
    const Update = async () => {
        const FORM = new FormData();
        FORM.append('nuevaClave', claveNueva);
        FORM.append('confirmarClave', confirmarClave);
        FORM.append('inputCorreo', correo);
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=updateClave`, { // Verifica la acción de actualizar clave
                method: 'POST',
                body: FORM
            });

            const responseText = await response.text();
            console.log('Response Text:', responseText);
            const DATA = JSON.parse(responseText);
            if (DATA.status) {
                setAlertMessage('Se ha actualizado la contraseña');
                setSuccessVisible(true);
                navigation.navigate('Login');
            } else {
                setAlertMessage(`${DATA.error}`);
                setErrorVisible(true);
            }
        } catch (error) {
            setAlertMessage(`Ocurrió un error: ${error.message}`);
            setErrorVisible(true);
        }
    };

    // Navegación
    const Regresar = () => {
        navigation.navigate('VerifyCode');
    };


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
                <Text style={styles.texto}>Cambiar contraseña</Text>
                <Input
                    placeHolder='Contraseña'
                    setValor={claveNueva}
                    setTextChange={setClaveNueva}
                    contra={true}  // Aquí se pasa true para activar la máscara
                />
                <Input
                    placeHolder='Confirmar contraseña'
                    setValor={confirmarClave}
                    setTextChange={setConfirmarClave}
                    contra={true}  // Aquí también se pasa true para activar la máscara
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
