import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, FlatList, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ModalCompra from '../components/Modales/ModalCompra';
import * as Constantes from '../utils/constantes';
import DetailProductCard from '../components/Productos/DetailProductoCard';
import { useRoute, useNavigation } from '@react-navigation/native';

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

    const backProducts = () => {
        navigation.navigate('Products'); // Usa la instancia de navegación para ir a la pantalla Products
    };

    const handleCompra = (nombre, id) => {
        setModalVisible(true);
        setIdProductoModal(id);
        setNombreProductoModal(nombre);
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

    return (
        <View style={styles.container}>
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
                            accionBotonProducto2={backProducts} // Pasa la función de navegación aquí
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productName: {
        fontSize: 18,
        marginVertical: 10,
    },
    productId: {
        fontSize: 18,
        marginVertical: 10,
    },
    containerFlat: {
        flex: 1
    },

    text: {
        marginTop: 40,
        fontSize: 15,
        fontWeight: "bold"
    }
});

export default Detalles;
