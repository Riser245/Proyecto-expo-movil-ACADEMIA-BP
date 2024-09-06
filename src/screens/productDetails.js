import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, FlatList, Alert, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ModalCompra from '../components/Modales/ModalCompra';
import * as Constantes from '../utils/constantes';
import Constants from 'expo-constants';
import DetailProductCard from '../components/Productos/DetailProductoCard';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import GoBackProduct from '../components/Buttons/GoBackButton';
import TopBar from '../components/TopBar/TopBar';

const Detalles = () => {
    const navigation = useNavigation(); // Obtén la instancia de navegación
    const route = useRoute();
    const { idCategoria, idProducto } = route.params;

    const ip = Constantes.IP;
    const [dataProductos, setDataProductos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [idProductoModal, setIdProductoModal] = useState('');
    const [nombreProductoModal, setNombreProductoModal] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [nombre, setNombre] = useState(null);

    const backProducts = () => {
        navigation.navigate('Products'); // Usa la instancia de navegación para ir a la pantalla Products
    };

    const handleCompra = (nombre, id) => {
        setModalVisible(true);
        setIdProductoModal(id);
        setNombreProductoModal(nombre);
    };

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

    const getProductos = async (idCategoriaSelect, idproducto) => {
        try {
            if (idCategoriaSelect <= 0) {
                return;
            }
            const formData = new FormData();
            formData.append('idCategoria', idCategoriaSelect);
            formData.append('idProducto', idproducto);
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/productos.php?action=readProductosCategoria`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (data.status) {
                setDataProductos(data.dataset);
            } else {
                Alert.alert('Error productos', data.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al listar los productos');
        }
    };

    useEffect(() => {
        getProductos(idCategoria, idProducto);
    }, [idCategoria, idProducto]);

    useFocusEffect(
        React.useCallback(() => {
            getUser();
        }, [])
    );

    return (
        <View style={styles.container}>
            <TopBar nombre={nombre} />
            {/* Contenedor para alinear el botón y el texto en la misma fila */}
            <View style={styles.headerContainer}>
                <GoBackProduct/>
            </View>
            <Text style={styles.text}>Selecciona un producto</Text>

            <ModalCompra
                visible={modalVisible}
                cerrarModal={setModalVisible}
                nombreProductoModal={nombreProductoModal}
                idDetalleModal={idProductoModal}
                cantidad={cantidad}
                setCantidad={setCantidad}
            />
            <SafeAreaView style={styles.containerFlat}>
                <FlatList
                    data={dataProductos}
                    keyExtractor={(item) => item.id_detalle_producto.toString()}
                    renderItem={({ item }) => (
                        <DetailProductCard
                            ip={ip}
                            imagenProducto={item.imagen_producto}
                            nombreProducto={item.nombre_producto}
                            descripcionProducto={item.descripcion_producto}
                            precioProducto={item.precio_producto}
                            existenciasProducto={item.existencias_producto}
                            descuentoProducto={item.descuento_producto}
                            talla={item.talla}
                            color={item.color}
                            accionBotonProducto={() => handleCompra(item.nombre_producto, item.id_detalle_producto)}
                        />
                    )}
                />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row', // Organiza el botón y el texto en una fila
        alignItems: 'center', // Alinea verticalmente el botón y el texto
        justifyContent: 'space-between', // Espacio entre el botón y el texto
        width: '90%', // Ancho del contenedor para que el contenido no quede al borde
        marginTop: 20,
    },
    text: {
        fontSize: 15,
        fontWeight: "bold",
    },
    containerFlat: {
        flex: 1,
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
});

export default Detalles;
