import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert, FlatList, TouchableOpacity } from 'react-native';
import ModalValoracion from '../components/Modales/ModalValoracion';
import * as Constantes from '../utils/constantes';
import Modal from 'react-native-modal';
import ComprasViews from '../components/Compras/ComprasViews';
import { useFocusEffect } from '@react-navigation/native';
import TopBar from '../components/TopBar/TopBar';
import useAuth from '../components/TopBar/Auth';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Importamos los íconos

export default function MisCompras() {
    const ip = Constantes.IP;
    const { isModalVisible, handleLogout, toggleModal } = useAuth();

    const [nombre, setNombre] = useState(null);
    const [datCompras, setDataCompras] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [idDetalleModal, setIdDetalleModal] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [calificacion, setCalificacion] = useState(0);
    const [comentario, setComentario] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const getUser = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                setNombre(data.username);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener el usuario');
        }
    };

    const handleCompra = (id) => {
        setModalVisible(true);
        setIdDetalleModal(id);
    };

    const getCompras = async () => {
        try {
            let url = `${ip}/AcademiaBP_EXPO/api/services/public/compras.php?action=myOrders`;
            let options = { method: 'GET' };
    
            if (searchTerm.trim() !== '') {
                url = `${ip}/AcademiaBP_EXPO/api/services/public/compras.php?action=searchOrders`;
                options = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ search: searchTerm }).toString(),
                };
            }
    
            const response = await fetch(url, options);
            const data = await response.json();
            if (data.status) {
                setDataCompras(data.dataset);
            } else {
                Alert.alert('Error al cargar tus compras', data.error || 'No se encontraron datos');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un problema al listar las compras: ' + error.message);
        }
    };

    useEffect(() => {
        getCompras();
    }, [searchTerm]);

    useFocusEffect(
        React.useCallback(() => {
            getUser();
        }, [])
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.containerFlat}>
                <TopBar nombre={nombre} />
                <View style={styles.titleContainer}>
                    <Text style={styles.text1}>Mis Compras</Text>
                </View>

                {/* Barra de búsqueda con ícono */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#ccc" style={styles.icon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Producto, fecha de compra o ID de la compra"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                </View>

                <FlatList
                    data={datCompras}
                    keyExtractor={(item) => item.id_detalle_compra}
                    renderItem={({ item }) => {
                        const precioTotal = ((item.precio_producto * item.cantidad_producto) - (item.precio_producto * item.cantidad_producto * item.descuento_producto / 100)).toFixed(2);

                        return (
                            <ComprasViews
                                ip={ip}
                                idDetalle={item.id_detalle_compra}
                                idOrden={item.id_compra}
                                imagenProducto={item.imagen_producto}
                                nombreProducto={item.nombre_producto}
                                precioProducto={item.precio_producto}
                                cantidad={item.cantidad_producto}
                                descuentoProducto={item.descuento_producto}
                                precioTotal={precioTotal}
                                fechaCompra={item.fecha_registro}
                                estado={item.estado_compra}
                                accionBotonCompras={() => handleCompra(item.id_detalle_compra)}
                            />
                        );
                    }}
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

            {/* Modal de valoración */}
            <ModalValoracion
                visible={modalVisible}
                cerrarModal={() => setModalVisible(false)}
                idDetalle={idDetalleModal}
                calificacion={calificacion}
                comentario={comentario}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    containerFlat: { flex: 1 },
    container: { flex: 1, backgroundColor: '#fff' },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 20,
    },
    text1: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 10,
        textAlign: 'center',
    },
    searchContainer: {
        flexDirection: 'row', // Añadido para alinear el ícono y el input
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '95%', // Reducido para hacer espacio al ícono
    },
    icon: {
        position: 'absolute',
        left: 335,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: { fontSize: 18, marginBottom: 20 },
    modalButton: {
        backgroundColor: '#ff5c5c',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        width: 100,
        alignItems: 'center',
    },
    modalButtonText: { color: 'white', fontWeight: 'bold' },
});
