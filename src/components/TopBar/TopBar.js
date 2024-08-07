import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Constantes from '../../utils/constantes';
import Modal from 'react-native-modal';

const TopBar = ({ nombre }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const ip = Constantes.IP;

    // Formatear el nombre de usuario
    const formatUsername = (username) => {
        if (!username) return 'No hay correo para mostrar';
        const localPart = username.split('@')[0];
        if (localPart.length < 2) return localPart;
        return localPart.charAt(0) + localPart.charAt(localPart.length - 1);
    };

    // Manejar el cierre de sesión
    const handleLogout = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=logOut`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    // Alternar visibilidad del modal
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.row}>
            <View style={styles.circle}>
                <Text style={styles.emailText}>{formatUsername(nombre)}</Text>
            </View>
            <TouchableOpacity
                onPress={handleLogout}
                onLongPress={toggleModal}
            >
                <Image
                    source={require('../../imagenes/logoAcademiaBP.png')}
                    style={styles.image}
                />
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Cerrar sesión</Text>
                    <TouchableOpacity onPress={handleLogout} style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Sí</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={toggleModal} style={[styles.modalButton, { backgroundColor: '#ddd' }]}>
                        <Text style={[styles.modalButtonText, { color: '#000' }]}>No</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginTop: 20,
        borderColor: '#000',
    },
    emailText: {
        color: '#000',
        textAlign: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    modalButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'darkblue',
        width: 100,
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
    },
});

export default TopBar;