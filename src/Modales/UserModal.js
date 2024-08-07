import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import Buttons from '../components/Buttons/Button';

const UserModal = ({
    isVisible,
    onClose,
    onSubmit,
    nombre, setNombre,
    apellido, setApellido,
    correo, setCorreo,
    direccion, setDireccion,
    dui, setDui,
    telefono, setTelefono,
    clave, setClave,
    fotoo, setFotoo,
    confirmarClave, setConfirmarClave,
    modalType
}) => {
    

    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose}>
            <View style={styles.modalContent}>
                {modalType === 'create' && <Text style={styles.modalTitle}>Crear Usuario</Text>}
                {modalType === 'edit' && <Text style={styles.modalTitle}>Editar Usuario</Text>}
                {modalType === 'password' && <Text style={styles.modalTitle}>Cambiar Contraseña</Text>}
                
                {/* Renderización condicional de los inputs */}
                {(modalType === 'create' || modalType === 'edit') && (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre"
                            value={nombre}
                            onChangeText={text => setNombre(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Apellido"
                            value={apellido}
                            onChangeText={text => setApellido(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Correo"
                            value={correo}
                            onChangeText={text => setCorreo(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Dirección"
                            value={direccion}
                            onChangeText={text => setDireccion(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="DUI"
                            value={dui}
                            onChangeText={text => setDui(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Teléfono"
                            value={telefono}
                            onChangeText={text => setTelefono(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Imagen"
                            value={fotoo}
                            onChangeText={text => setFotoo(text)}
                        />
                    </>
                )}

                {/* Renderización condicional para cambio de contraseña */}
                {modalType === 'password' && (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Clave Actual"
                            secureTextEntry
                            value={clave}
                            onChangeText={text => setClave(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nueva Contraseña"
                            secureTextEntry
                            value={confirmarClave}
                            onChangeText={text => setConfirmarClave(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar Nueva Contraseña"
                            secureTextEntry
                            value={confirmarClave}
                            onChangeText={text => setConfirmarClave(text)}
                        />
                    </>
                )}

                <Buttons
                    textoBoton={modalType === 'password' ? 'Cambiar Contraseña' : 'Actualizar Datos'}
                    accionBoton={onSubmit}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#5C3D2E',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
    },
    imagePicker: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    imagePickerText: {
        color: '#5C3D2E',
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#AF8260',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default UserModal;
