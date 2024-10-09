import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import * as Constantes from '../../utils/constantes';
import Buttons from '../Buttons/Button';

const ModalMetodoPago = ({ modalVisible, cerrarModal, setMetodoPago }) => {
    const [metodosPago, setMetodosPago] = useState([]);
    const ip = Constantes.IP;

    useEffect(() => {
        fetchMetodosPago();
    }, []);

    const fetchMetodosPago = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/compras.php?action=readMetodosPago`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.status) {
                setMetodosPago(data.dataset);
            } else {
                setMetodosPago([]);
                console.error('Error al cargar métodos de pago:', data.error);
            }
        } catch (error) {
            console.error('Ocurrió un error al cargar los métodos de pago:', error);
        }
    };

    const handleSelectMetodoPago = (item) => {
        try {
            const metodoPagoSeleccionado = {
                id_metodo_pago: item.id_metodo_pago,
                nombre_metodo: item.nombre_metodo,
            };
            console.log('Método de pago seleccionado:', metodoPagoSeleccionado); // Para depurar
            setMetodoPago(metodoPagoSeleccionado); // Envía el objeto con id y nombre del método de pago seleccionado
            cerrarModal(false); // Cerrar modal al seleccionar un método de pago
        } catch (error) {
            console.error('Error al seleccionar el método de pago:', error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.metodoPagoItem} onPress={() => handleSelectMetodoPago(item)}>
            <Image
                source={{ uri: `${ip}/AcademiaBP_EXPO/api/images/metodospagos/${item.imagen_metodo}` }}
                style={styles.metodoPagoImage}
                resizeMode="contain"
            />
            <Text style={styles.metodoPagoText}>{item.nombre_metodo}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Seleccione un método de pago</Text>
                    {metodosPago.length > 0 ? (
                        <FlatList
                            data={metodosPago}
                            keyExtractor={(item) => item.id_metodo_pago.toString()}
                            renderItem={renderItem}
                        />
                    ) : (
                        <Text style={styles.emptyText}>No hay métodos de pago disponibles.</Text>
                    )}
                    <Buttons textoBoton="Cancelar" accionBoton={() => cerrarModal(false)} />
                </View>
            </View>
        </Modal>
    );
};

export default ModalMetodoPago;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    metodoPagoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    metodoPagoImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    metodoPagoText: {
        fontSize: 18,
        color: '#333',
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
    },
});
