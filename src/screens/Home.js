import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Dimensions, SafeAreaView, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import * as Constantes from '../utils/constantes';
import EntrenamientoView from '../components/EntrenamientoViews/EntrenamientosView';
import Modal from 'react-native-modal';
import TopBar from '../components/TopBar/TopBar'

const { width } = Dimensions.get('window');

export default function Home({ navigation }) {
    const [nombre, setNombre] = useState(null);
    const ip = Constantes.IP;
    const [dataEntrenamientos, setDataEntrenamientos] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);

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

    const getUser = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                setNombre(data.username); //Aqui asignamos el correo del usuario que ha iniciado sesion
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener el usuario');
        }
    };

    const getEntrenamientos = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/entrenamiento.php?action=readAllHorariosLugares`, {
                method: 'GET', //Obtenemos la información extra de La Academia
            });

            const data = await response.json();
            console.log(data);

            if (data.status) {
                setDataEntrenamientos(data.dataset);
            } else {
                Alert.alert('Error al cargar los entrenamientos', data.error);
            }

        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cargar los entrenamientos');
        }
    };

    useEffect(() => { //Se cargan los metodos
        getUser();
        getEntrenamientos();
    }, []);

    const formatUsername = (username) => { //Formateamos el correo a mostrar, para que unicamente se muestre la primer y ultima letra antes del @
        if (!username) return 'No hay correo para mostrar';
        const localPart = username.split('@')[0];
        if (localPart.length < 2) return localPart; // En caso de que el nombre de usuario sea de una sola letra
        return localPart.charAt(0) + localPart.charAt(localPart.length - 1);
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible); //Mostramos una modal para cerrar sesion
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <TopBar
                    formatUsername={formatUsername}
                    nombre={nombre}
                    handleLogout={handleLogout}
                    toggleModal={toggleModal}
                />
                <Text style={styles.titleHeader}>Bienvenid@</Text>
                <Text style={styles.titleHeader2}>Información sobre nosotros</Text>
            </View>

            <SafeAreaView style={styles.containerFlat}>
                <FlatList
                    data={dataEntrenamientos}
                    keyExtractor={(item) => item.id_lugar.toString()} // Id por el que se cargan las cards
                    renderItem={({ item }) => (
                        <EntrenamientoView
                            ip={ip}
                            idLugar={item.id_lugar}
                            imagenLugar={item.imagen_lugar}
                            nombrelugar={item.nombre_lugar}
                            horariosE={item.horarios}
                        />
                    )}
                    ListHeaderComponent={<></>}
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
    item: {
        width: width * 0.9,
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
