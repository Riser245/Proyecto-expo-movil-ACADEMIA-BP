import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, ImageBackground, ScrollView } from 'react-native';
import Input from '../components/Inputs/Inputs';
import InputMultiline from '../components/Inputs/InputMultiline';
import Buttons from '../components/Buttons/Button';
import MaskedInputTelefono from '../components/Inputs/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/MaskedInputDui';
import InputEmail from '../components/Inputs/InputEmail';
import * as Constantes from '../utils/constantes';

export default function SignUp({ navigation }) {
    const ip = Constantes.IP;

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dui, setDui] = useState('');
    const [telefono, setTelefono] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmarClave] = useState('');

    const handleLogout = async () => {
        navigation.navigate('Login');
    };

    const handleCreate = async () => {
        try {
            const fechaMinima = new Date();
            fechaMinima.setFullYear(fechaMinima.getFullYear() - 18);

            if (!nombre.trim() || !apellido.trim() || !email.trim() || !direccion.trim() ||
                !dui.trim() || !telefono.trim() || !clave.trim() || !confirmarClave.trim()) {
                Alert.alert("Debes llenar todos los campos");
                return;
            }

            const formData = new FormData();
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', email);
            formData.append('direccionCliente', direccion);
            formData.append('duiCliente', dui);
            formData.append('telefonoCliente', telefono);
            formData.append('claveCliente', clave);
            formData.append('confirmarClave', confirmarClave);


            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=signUpMovil`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data)
            if (data.status) {
                Alert.alert('Datos Guardados correctamente');
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al intentar crear el usuario');
        }
    };

    return (
        <ImageBackground source={require('../imagenes/inicio.png')} style={styles.background}>
            <ScrollView contentContainerStyle={styles.mainContent}>

                <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={true}>
                    <Text style={styles.texto}>Registrar Usuario</Text>
                    <Input
                        placeHolder='Nombre Cliente'
                        setValor={nombre}
                        setTextChange={setNombre}
                        style={styles.inputSpacing}
                    />
                    <Input
                        placeHolder='Apellido Cliente'
                        setValor={apellido}
                        setTextChange={setApellido}
                        style={styles.inputSpacing}
                    />
                    <InputEmail
                        placeHolder='Email Cliente'
                        setValor={email}
                        setTextChange={setEmail}
                        style={styles.inputSpacing}
                    />
                    <InputMultiline
                        placeHolder='Dirección Cliente'
                        setValor={setDireccion}
                        valor={direccion}
                        setTextChange={setDireccion}
                        style={styles.inputSpacing}
                    />
                    <MaskedInputDui
                        dui={dui}
                        setDui={setDui}
                        style={styles.inputSpacing}
                    />
                    <MaskedInputTelefono
                        telefono={telefono}
                        setTelefono={setTelefono}
                        style={styles.inputSpacing}
                    />
                    <Input
                        placeHolder='Clave'
                        contra={true}
                        setValor={clave}
                        setTextChange={setClave}
                        style={styles.inputSpacing}
                    />
                    <Input
                        placeHolder='Confirmar Clave'
                        contra={true}
                        setValor={confirmarClave}
                        setTextChange={setConfirmarClave}
                        style={styles.inputSpacing}
                    />


                </ScrollView>
                <Buttons
                    textoBoton='Registrar Usuario'
                    accionBoton={handleCreate}
                    style={styles.buttonSpacing}
                />
                <Buttons
                    textoBoton='Ir al Login'
                    accionBoton={handleLogout}
                    style={styles.buttonSpacing}
                />
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        padding: 40,
        paddingTop: 250, // Adjust bottom padding as needed
    },
    scrollViewContent: {
        alignItems: 'center',
        width: '100%',
        paddingBottom: 20, // Adjust bottom padding as needed
        marginLeft: 10
    },
    texto: {
        color: '#322C2B',
        fontWeight: '900',
        fontSize: 20,
        marginTop: 50,
        marginBottom: 20,
    },
    inputSpacing: {
        marginTop: 20,
        width: '100%',
    },
    buttonSpacing: {
        marginTop: 30,
        width: '100%',
    },
});
