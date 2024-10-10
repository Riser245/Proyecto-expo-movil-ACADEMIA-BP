import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utils/constantes';
import Buttons from '../components/Buttons/Button';
import CarritoCard from '../components/CartCard/CartCard';
import ModalEditarCantidad from '../components/Modales/ModalEditarCantidad';
import TopBar from '../components/TopBar/TopBar';
import useAuth from '../components/TopBar/Auth';
import CustomAlertError from '../components/CustomAlert/CustomAlertError';
import CustomAlertExito from '../components/CustomAlert/CustomAlertSuccess';
import ModalMetodoPago from '../components/MetodosPago/MetodosPago'; // El modal para seleccionar método de pago

const Carrito = ({ navigation }) => {
    const { nombre, isModalVisible, handleLogout, toggleModal } = useAuth();
    const [dataDetalleCarrito, setDataDetalleCarrito] = useState([]);
    const [idDetalle, setIdDetalle] = useState(null);
    const [cantidadProductoCarrito, setCantidadProductoCarrito] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const ip = Constantes.IP;
    const [errorVisible, setErrorVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [metodoPago, setMetodoPago] = useState(null); // Cambia a un objeto
    const [modalMetodoPagoVisible, setModalMetodoPagoVisible] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getDetalleCarrito();
        }, [])
    );

    const getDetalleCarrito = async () => {
        try {
            setSuccessVisible(false);
            setErrorVisible(false);

            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/compras.php?action=readDetail`, {
                method: 'GET',
            });
            const data = await response.json();

            if (data.status) {
                setDataDetalleCarrito(data.dataset);
                setAlertMessage('¡Ya tienes productos dentro del carrito!');
                setSuccessVisible(true);
            } else {
                setAlertMessage('Aún no has agregado productos al carrito');
                setErrorVisible(true);
            }
        } catch (error) {
            setAlertMessage('Ocurrió un error al listar los detalles.');
            setErrorVisible(true);
        }
    };

    const finalizarPedido = async () => {
        try {
            setSuccessVisible(false);
    
            const idMetodoPago = metodoPago?.id_metodo_pago || null; // Asegúrate de obtener el id_metodo_pago
            const datosPago = metodoPago?.datosPago || {}; // Obtenemos datosPago, asegurándonos de que sea un objeto
    
            // Validar que idMetodoPago no sea nulo
            if (!idMetodoPago) {
                Alert.alert('Advertencia', 'No se seleccionó un método de pago. Continuar puede no ser ideal.');
                return; // Salimos si no hay método de pago
            }
    
            // Construir datosPago como una cadena concatenada sin el signo igual
            const datosPagoString = Object.entries(datosPago)
                .map(([key, value]) => `${key}${value}`) // Cambiado para omitir el '='
                .join(','); // Unir usando coma
    
            // Construir el cuerpo de la solicitud
            const bodyData = `idMetodoPago=${idMetodoPago}&datosPago=${datosPagoString}`; // No se usa encodeURIComponent
    
            console.log('Datos que se enviarán:', bodyData); // Mostrar el cuerpo de la solicitud
    
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/compras.php?action=finishOrder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Cambiar el tipo de contenido
                },
                body: bodyData, // Envía los datos como un string
            });
    
            const data = await response.json();
            if (data.status) {
                setAlertMessage('Compra finalizada correctamente');
                setDataDetalleCarrito([]);
                setSuccessVisible(true);
                setTimeout(() => {
                    navigation.navigate('Productos', { screen: 'Productos' });
                }, 2000);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error('Error al finalizar la compra:', error);
            setAlertMessage('Ocurrió un error al finalizar la compra');
            setErrorVisible(true);
        }
    };
    
    


    const handleEditarDetalle = (idDetalle, cantidadDetalle) => {
        setModalVisible(true);
        setIdDetalle(idDetalle);
        setCantidadProductoCarrito(cantidadDetalle);
    };

    const handleSeleccionarMetodoPago = (metodo) => {
        setMetodoPago(metodo); // Ahora esto almacena un objeto
        setModalMetodoPagoVisible(false);
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
            updateDataDetalleCarrito={setDataDetalleCarrito}
        />
    );

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

            <ModalMetodoPago
                modalVisible={modalMetodoPagoVisible}
                setMetodoPago={handleSeleccionarMetodoPago}
                cerrarModal={setModalMetodoPagoVisible}
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
                    <Text style={styles.totalText}>Método de Pago: {metodoPago ? metodoPago.nombre_metodo : 'Ninguno seleccionado'}</Text>
                </View>
            )}

            <View style={styles.containerButtons}>
                {dataDetalleCarrito.length > 0 && (
                    <>
                        <Buttons
                            textoBoton='Seleccionar Método de Pago'
                            accionBoton={() => setModalMetodoPagoVisible(true)}
                        />
                        <Buttons
                            textoBoton='Finalizar Pedido'
                            accionBoton={finalizarPedido}
                        />
                    </>
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
    totalContainer: {
        padding: 16,
        backgroundColor: '#F0F0F0',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 16,
    },
    totalText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    containerButtons: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },
});
