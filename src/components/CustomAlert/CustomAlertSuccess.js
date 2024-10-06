import React from 'react';
import { View, Text, StyleSheet, Modal, Image } from 'react-native';
import Buttons from '../Buttons/Button';
import Exito from '../../imagenes/Exito.jpg';

const CustomAlertExito = ({ visible, onClose, message }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
        >
            <View style={styles.container}>
                <View style={styles.alertBox}>
                    
                    <Image source={Exito} style={styles.image} />
                    <Text style={styles.alertText}>{message}</Text>
                    <Buttons textoBoton="Cerrar" accionBoton={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertBox: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    alertText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
});

export default CustomAlertExito;
