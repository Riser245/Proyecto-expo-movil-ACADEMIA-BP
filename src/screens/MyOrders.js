import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert, FlatList, Image } from 'react-native';
import ModalValoracion from '../components/Modales/ModalValoracion'; // Importa el ModalValoracion
import * as Constantes from '../utils/constantes';
import ComprasViews from '../components/Compras/ComprasViews';
import { useFocusEffect } from '@react-navigation/native';

export default function MisCompras() {
    // Constante IP del servidor
    const ip = Constantes.IP;
    // Estado para almacenar las compras
    const [datCompras, setDataCompras] = useState([]);
    // Estado para controlar la visibilidad del drawer
    const [drawerVisible, setDrawerVisible] = useState(false);
    // Estado para controlar el ID del detalle de compra en el modal
    const [idDetalleModal, setIdDetalleModal] = useState('');
    // Estado para controlar la visibilidad del modal de valoración
    const [modalVisible, setModalVisible] = useState(false);
    // Estado para almacenar la calificación
    const [calificacion, setCalificacion] = useState(0);
    // Estado para almacenar el comentario
    const [comentario, setComentario] = useState('');
    // Estado para almacenar el término de búsqueda
    const [searchTerm, setSearchTerm] = useState('');


    // Función para manejar la selección de una compra
    const handleCompra = (id) => {
        setModalVisible(true);
        setIdDetalleModal(id);
    };

    // Función para obtener las compras del usuario
    const getCompras = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/compras.php?action=myOrders`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setDataCompras(data.dataset);
            } else {
                Alert.alert('Error al cargar tus compras', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar las compras');
        }
    };


    // Efecto para obtener las compras del usuario al cargar el componente
    useEffect(() => {
        if (searchTerm.trim() === '') {
            getCompras();
        }
        getCompras();
    }, [searchTerm]);

    return (
        <View style={styles.container}>


            <SafeAreaView style={styles.containerFlat}>
                <View style={styles.titleContainer}>
                    <Text style={styles.text1}>Mis compras</Text>


                </View>
                {/* Lista de compras */}
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
                    ListHeaderComponent={<></>}
                />
            </SafeAreaView>

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
    containerFlat: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
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
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    bottomView: {
        width: '100%',
        height: 120,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 390
    },
    imagen3: {
        width: 97,
        height: 100,
        marginRight: 10,
        marginLeft: 25
    },
    textContainer: {
        marginLeft: 10,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    textItem: {
        color: 'white',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 5,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '90%'
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
    },
});
