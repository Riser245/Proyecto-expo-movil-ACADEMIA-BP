import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList, Image, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ModalCompra from '../components/Modales/ModalCompra';
import * as Constantes from '../utils/constantes';
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants';
import DetailProductCard from '../components/Productos/DetailProductoCard';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const Detalles = () => {
    const ip = Constantes.IP;
    const [dataProductos, setDataProductos] = useState([]);
    const [dataCategorias, setDataCategorias] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [cantidad, setCantidad] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [idProductoModal, setIdProductoModal] = useState('');
    const [nombreProductoModal, setNombreProductoModal] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0); // Índice de la imagen actual

    const route = useRoute();
    const { idCategoria, idProducto } = route.params;

    const volverInicio = () => {
        setDrawerVisible(true);
    };

    //Función para enviar los datos al carrito de compra
    const handleCompra = (nombre, id) => {
        setModalVisible(true);
        setIdProductoModal(id);
        setNombreProductoModal(nombre);

        console.log(id)
        console.log(nombre)
    };

    //Método para obtener los detalles de los productos, dependiendo del producto que se haya seleccionado y la categoría correspondiente
    const getProductos = async (idCategoriaSelect, idproducto) => {
        try {
            if (idCategoriaSelect <= 0) {
                return;
            }
            const formData = new FormData();
            formData.append('idCategoria', idCategoriaSelect); //Mandamos la categoría
            formData.append('idProducto', idproducto); //Mandamos el producto, para obtener tanto la talla como el color
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/productos.php?action=readProductosCategoria`, {
                method: 'POST',
                body: formData
            });
            console.log(idCategoriaSelect);
            console.log(idproducto);

            const data = await response.json();

            if (data.status) {
                setDataProductos(data.dataset);
            } else {
                Alert.alert('Error productos', data.error);
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al listar los productos');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getProductos(idCategoria, idProducto);
        }, [])
    );

    return (
        <View style={styles.container}>

            <Text style={styles.text}>Selecciona un producto</Text>
            {/* Modal de compra */}
            <ModalCompra
                visible={modalVisible}
                cerrarModal={setModalVisible}
                nombreProductoModal={nombreProductoModal}
                idDetalleModal={idProductoModal}
                cantidad={cantidad}
                setCantidad={setCantidad}
            />

            <SafeAreaView style={styles.containerFlat}>
                {/* Aquí reemplazamos ScrollView por FlatList */}
                <FlatList
                    data={dataProductos}
                    keyExtractor={(item) => item.id_detalle_producto.toString()} // Asegúrate de que sea una cadena
                    renderItem={({ item }) => (
                        <DetailProductCard
                            ip={ip}
                            imagenProducto={item.imagen_producto}
                            nombreProducto={item.nombre_producto}
                            descripcionProducto={item.descripcion_producto}
                            precioProducto={item.precio_producto}
                            existenciasProducto={item.existencias_producto}
                            descuentoProducto={item.descuento_producto}
                            talla={item.talla} // Asegúrate de que todos los props necesarios sean pasados
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
