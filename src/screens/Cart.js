import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert, Image, TouchableOpacity, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Constantes from '../utils/constantes';
import Buttons from '../components/Buttons/Button';
import CarritoCard from '../components/CartCard/CartCard';
import ModalEditarCantidad from '../components/Modales/ModalEditarCantidad';
import TopBar from '../components/TopBar/TopBar';
import useAuth from '../components/TopBar/Auth';
import CustomAlertError from '../components/CustomAlert/CustomAlertError';
import CustomAlertExito from '../components/CustomAlert/CustomAlertSuccess';

const Carrito = ({ navigation }) => {

    const { isModalVisible, handleLogout, toggleModal } = useAuth();
    const [nombre, setNombre] = useState(null);
    const [dataDetalleCarrito, setDataDetalleCarrito] = useState([]);
    const [idDetalle, setIdDetalle] = useState(null);
    const [cantidadProductoCarrito, setCantidadProductoCarrito] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const ip = Constantes.IP;
    const [errorVisible, setErrorVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [modalVisible2, setModalVisible2] = useState(false);




    useFocusEffect(
        React.useCallback(() => {
            getDetalleCarrito();
            getUser();
        }, [])
    );


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
                setErrorVisible(true);  // Mostrar alerta de error
            }
        } catch (error) {
            setAlertMessage('Ocurrió un error al obtener el usuario');
            setErrorVisible(true);  // Mostrar alerta de error
        }
    };

    //Obtenemos los datos del carrito
    const getDetalleCarrito = async () => {
        try {
            // Reinicia el estado de las alertas antes de hacer la petición
            setSuccessVisible(false);
            setErrorVisible(false);
    
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/compras.php?action=readDetail`, {
                method: 'GET',
            });
            const data = await response.json();
    
            if (data.status) {
                setDataDetalleCarrito(data.dataset);
                setAlertMessage('¡Ya tienes productos dentro del carrito!');
                setSuccessVisible(true);  // Muestra la alerta de éxito
            } else {
                setAlertMessage('Aún no has agregado productos al carrito');
                setErrorVisible(true);  // Muestra la alerta de error
            }
        } catch (error) {
            setAlertMessage('Ocurrió un error al listar los detalles.');
            setErrorVisible(true);  // Muestra la alerta de error
        }
    };
    

    //Método para finalizar la compra del cliente
    const finalizarPedido = async () => {
        try {
            // Reinicia el estado de la alerta antes de hacer la petición
            setSuccessVisible(false);
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/compras.php?action=finishOrder`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.status) {
                setAlertMessage('Compra finalizada correctamente');
                setDataDetalleCarrito([]); // Vaciar el carrito
                setSuccessVisible(true); // Mostrar la alerta de éxito
                // Navega a la pantalla de Productos después de 2 segundos
                setTimeout(() => {
                    navigation.navigate('Productos', { screen: 'Productos' });
                }, 2000); // Espera 2 segundos antes de navegar
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            setAlertMessage('Ocurrió un error al finalizar la compra');
            setErrorVisible(true);  // Muestra la alerta de error
        }
    };




    //Función para mostrar la modal para editar cantidad de productos
    const handleEditarDetalle = (idDetalle, cantidadDetalle) => {
        setModalVisible(true);
        setIdDetalle(idDetalle);
        setCantidadProductoCarrito(cantidadDetalle);
    };

    const renderItem = ({ item }) => (
        <CarritoCard
            item={item}
            cargarCategorias={getDetalleCarrito}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            setCantidadProductoCarrito={setCantidadProductoCarrito}
            cantidadProductoCarrito={cantidadProductoCarrito}
            idDetalle={idDetalle}
            setIdDetalle={setIdDetalle}
            accionBotonDetalle={handleEditarDetalle}
            getDetalleCarrito={getDetalleCarrito}
            updateDataDetalleCarrito={setDataDetalleCarrito} // Nueva prop para actualizar la lista
        />
    );

    //Función para calcular el total de la compra
    const calcularTotalConDescuento = () => {
        return dataDetalleCarrito.reduce((total, item) => {
            const subtotalConDescuento = (
                parseFloat(item.precio_producto) * parseFloat(item.cantidad_producto) -
                (parseFloat(item.precio_producto) * parseFloat(item.cantidad_producto) * parseFloat(item.descuento_producto) / 100)
            );
            return total + subtotalConDescuento;
        }, 0).toFixed(2);
    };

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

            <ModalEditarCantidad
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                idDetalle={idDetalle}
                setIdDetalle={setIdDetalle}
                setCantidadProductoCarrito={setCantidadProductoCarrito}
                cantidadProductoCarrito={cantidadProductoCarrito}
                getDetalleCarrito={getDetalleCarrito}
            />

            <Text style={styles.title}>Carrito de Compras</Text>

            {dataDetalleCarrito.length > 0 ? (
                <FlatList
                    data={dataDetalleCarrito.filter(item => item.id_detalle_compra)}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id_detalle_compra.toString()}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            ) : (
                <Text style={styles.titleDetalle}>No hay detalles del carrito disponibles.</Text>
            )}

            {dataDetalleCarrito.length > 0 && (
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Total de la compra: ${calcularTotalConDescuento()}</Text>
                </View>
            )}

            <View style={styles.containerButtons}>
                {dataDetalleCarrito.length > 0 && (
                    <Buttons
                        textoBoton='Finalizar Pedido'
                        accionBoton={finalizarPedido}
                    />
                )}
            </View>
        </View>

    );
};

export default Carrito;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: '#E9E8E8',
        height: 60 + Constants.statusBarHeight,
        width: '100%',
    },
    image: {
        width: 90,
        height: 35,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#000',
        marginTop: 70,
    },
    titleDetalle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 16,
        color: '#5C3D2E',
    },
    containerButtons: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    totalContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 17,
    },
    totalText: {
        fontSize: 19,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
});
