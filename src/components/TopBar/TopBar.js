import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import useAuth from '../TopBar/Auth';

const TopBar = ({ nombre }) => {
    const { formatUsername, handleLogout } = useAuth();
    const [isModalVisible, setModalVisible] = React.useState(false);

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
                onLongPress={toggleModal} // Al mantener presionado, se activará el modal
            >
                <Image
                    source={require('../../imagenes/logoAcademiaBP.png')}
                    style={styles.image}
                />
            </TouchableOpacity>

            <Modal
                visible={isModalVisible} // Usar 'visible' en vez de 'isVisible'
                transparent={true} // Para que el fondo sea semi-transparente
                animationType="fade" // Puedes elegir 'slide', 'fade', etc.
                onRequestClose={toggleModal} // Para cerrar el modal cuando se presiona atrás en Android
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>¿Desea cerrar sesión?</Text>
                        <TouchableOpacity onPress={handleLogout} style={styles.modalButton}>
                            <Text style={styles.modalButtonText}>Sí</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleModal} style={[styles.modalButton, { backgroundColor: '#ddd' }]}>
                            <Text style={[styles.modalButtonText, { color: '#000' }]}>No</Text>
                        </TouchableOpacity>
                    </View>
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
        marginLeft: 20,
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
        marginRight: 20
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro traslúcido
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
