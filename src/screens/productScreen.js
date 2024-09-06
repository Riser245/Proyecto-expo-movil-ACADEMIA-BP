import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert, FlatList, ScrollView } from 'react-native';
import * as Constantes from '../utils/constantes';
import Constants from 'expo-constants';
import ProductoCard from '../components/Productos/ProductoCard';
import TopBar from '../components/TopBar/TopBar';
import { useFocusEffect } from '@react-navigation/native';
import useAuth from '../components/TopBar/Auth';

export default function MyComponent({ navigation }) {
    const ip = Constantes.IP;
    const [dataProductos, setDataProductos] = useState([]);
    const [dataCategorias, setDataCategorias] = useState([]);
    const { isModalVisible, handleLogout, toggleModal } = useAuth();
    const [nombre, setNombre] = useState(null);


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

    //Función para mandar a ProductDetail el detalle del producto que queremos ver
    const handleVerDetalle = (idCategoriaSelect, idProducto) => {
        navigation.navigate('Detalles', { idCategoria: idCategoriaSelect, idProducto });
    };

    const handleValoracion = (idProducto) => {
        navigation.navigate('CommentsProduct', { idProducto: idProducto })

        console.log(idProducto)
    };

    //Obtenemos los productos de la categoría seleccionada
    const getProductos = async (idCategoriaSelect = 1) => {
        try {
            if (idCategoriaSelect <= 0) {
                return;
            }
            const formData = new FormData();
            formData.append('idCategoria', idCategoriaSelect);
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/productos.php?action=readProductosCategorias`, {
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


    //Obtenemos todas las categorías de nuestra base de datos
    const getCategorias = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/categorias.php?action=readAll`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setDataCategorias(data.dataset);
            } else {
                Alert.alert('Error categorias', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar las categorias');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getProductos();
            getCategorias();
            getUser();
        }, [])
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.containerFlat}>
                <TopBar nombre={nombre} />
                <Text style={styles.pageTitle}>Nuestros productos</Text>
                <FlatList
                    data={dataProductos}
                    keyExtractor={(item, index) => item.id_producto ? item.id_producto.toString() : index.toString()}
                    renderItem={({ item }) => (
                        <ProductoCard
                            ip={ip}
                            idProducto={item.id_producto}
                            imagenProducto={item.imagen_producto}
                            nombreProducto={item.nombre_producto}
                            descripcionProducto={item.descripcion_producto}
                            accionBotonProducto={() => handleVerDetalle(item.id_categoria_producto, item.id_producto)}
                            accionBotonProducto2={() => handleValoracion(item.id_producto)}
                        />

                    )}


                    ListHeaderComponent={
                        <>
                            <View style={styles.categoryContainer}>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    style={styles.scrollContainer}
                                >
                                    {dataCategorias.map((categoria) => (
                                        <TouchableOpacity
                                            key={categoria.id_categoria_producto}
                                            style={styles.categoriaItem}
                                            onPress={() => getProductos(categoria.id_categoria_producto)}
                                        >
                                            <Text style={styles.categoriaText}>{categoria.categoria_producto}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </>
                    }
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    containerFlat: {
        flex: 1
    },
    scrollContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#040457',
        marginBottom: 10
    },
    categoriaItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 6,
    },
    categoriaText: {
        color: 'white',
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        width: 90,
        height: 35,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#5C3D2E',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
        color: '#5C3D2E',
    },
    categoryContainer: {
        alignItems: 'center', // Alinea horizontalmente el texto y el picker
        marginTop: 20
    },
    pickerContainer: {
        width: '90%', // Ancho del contenedor del picker
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#6D0E0E',
        borderWidth: 2,
        backgroundColor: '#F5F5F5',
    },
    picker: {
        color: '#322C2B',
    },
    cartButton: {
        flexDirection: 'row',
        backgroundColor: '#6D0E0E',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartButtonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginLeft: 10,
    },
    imagen2: {
        width: "100%",
        height: "100%",
        flex: 1
    },
    carouselContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "98%",
        height: 220, // Ajusta la altura del carrusel aquí
        marginTop: 0.5
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
        marginRight: 10, // Ajusta el margen derecho
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
    iconButton: {
        marginTop: 20,
    },
});