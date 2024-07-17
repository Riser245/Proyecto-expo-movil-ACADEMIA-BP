import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList, Image, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import ModalCompra from '../components/Modales/ModalCompra';
import * as Constantes from '../utils/constantes';
import RNPickerSelect from 'react-native-picker-select';
import Constants from 'expo-constants';
import detailProductCard from '../components/Productos/detailProductCard';

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

    const volverInicio = () => {
        setDrawerVisible(true);
    };
    const handleCompra = (nombre, id) => {
        setModalVisible(true);
        setIdProductoModal(id);
        setNombreProductoModal(nombre);
    };

    const getProductos = async (idCategoriaSelect = 1) => {
        try {
            if (idCategoriaSelect <= 0) {
                return;
            }
            const formData = new FormData();
            formData.append('idCategoria', idCategoriaSelect);
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
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al listar los productos');
        }
    };

    useEffect(() => {
        //getProductos();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalles del Producto</Text>
            <Text style={styles.productName}>Nombre: </Text>
            <Text style={styles.productId}>ID: </Text>
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
});

export default Detalles;
