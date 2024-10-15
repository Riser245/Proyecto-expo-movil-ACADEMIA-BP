import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Constantes from '../utils/constantes';
import EntrenamientoView from '../components/EntrenamientoViews/EntrenamientosView';
import Modal from 'react-native-modal';
import TopBar from '../components/TopBar/TopBar';
import { useFocusEffect } from '@react-navigation/native';
import useAuth from '../components/TopBar/Auth';
import CustomAlertError from '../components/CustomAlert/CustomAlertError';
import CustomAlertExito from '../components/CustomAlert/CustomAlertSuccess';

export default function Home({ navigation }) {
    const [nombre, setNombre] = useState(null);
    const [dataEntrenamientos, setDataEntrenamientos] = useState([]);
    const { isModalVisible, handleLogout, toggleModal } = useAuth();
    const ip = Constantes.IP;
    const [errorVisible, setErrorVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const getUser = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                setNombre(data.username);
            } else {
                setAlertMessage(data.error);
                setErrorVisible(true);
            }
        } catch (error) {
            setAlertMessage(error);
            setErrorVisible(true);
        }
    };

    const getEntrenamientos = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/entrenamiento.php?action=readAllHorariosLugares`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setDataEntrenamientos(data.dataset);
            } else {
                setAlertMessage('Error al cargar los entrenamientos', data.error);
                setErrorVisible(true);
            }

        } catch (error) {
            setAlertMessage(error);
            setErrorVisible(true);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getUser();
            getEntrenamientos();
        }, [])
    );

    return (
        <View style={styles.container}>
            <TopBar nombre={nombre} />

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

            <SafeAreaView style={styles.containerFlat}>
                <Text style={styles.title}>
                    ¡Bienvenido <Text style={styles.nombre}>{nombre}</Text>!
                </Text>

                <FlatList
                    data={dataEntrenamientos}
                    keyExtractor={(item) => item.id_lugar.toString()}
                    renderItem={({ item }) => (
                        <EntrenamientoView
                            ip={ip}
                            idLugar={item.id_lugar}
                            imagenLugar={item.imagen_lugar}
                            nombrelugar={item.nombre_lugar}
                            horariosE={item.horarios}
                        />
                    )}
                />
            </SafeAreaView>

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>¿Deseas cerrar sesión?</Text>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
    },
    nombre: {
        fontSize: 20,
        fontWeight: 'normal',
        color: '#F99911',
    },
    item: {
        width: 0.9,
        height: 300,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    button: {
        borderWidth: 2,
        borderColor: "black",
        width: 100,
        borderRadius: 10,
        backgroundColor: "darkblue",
    },
    buttonText: {
        textAlign: 'center',
        color: "white",
    },
    buttonContainer: {
        marginLeft: 'auto', // Asegurar que el botón de cerrar sesión se coloque a la derecha
    },
    titleHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
        color: '#5C3D2E', // Brown color for the title
    },
    titleHeader2: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 5,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 5,
        color: '#5C3D2E', // Brown color for the title
    },
    containerFlat: {
        flex: 1,
    },
});
