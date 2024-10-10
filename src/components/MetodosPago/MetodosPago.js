import React, { useState, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect
import * as Constantes from '../../utils/constantes';
import Buttons from '../Buttons/Button';

const ModalMetodoPago = ({ modalVisible, cerrarModal, setMetodoPago }) => {
    const [metodosPago, setMetodosPago] = useState([]);
    const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);
    const [datosPago, setDatosPago] = useState({});
    const ip = Constantes.IP;

    useFocusEffect(
        useCallback(() => {
            fetchMetodosPago();
        }, [])
    );

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
        setMetodoSeleccionado(item);
        setMetodoPago({
            id_metodo_pago: item.id_metodo_pago,
            nombre_metodo: item.nombre_metodo,
        });
        setDatosPago({}); // Reiniciar datos de pago al seleccionar un nuevo método
    };

    // Manejar cambios en los inputs
    const handleInputChange = (field, value) => {
        setDatosPago((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    // Mostrar inputs condicionales dependiendo del método de pago
    const renderInputsPorMetodo = () => {
        if (!metodoSeleccionado) return null;

        switch (metodoSeleccionado.nombre_metodo) {
            case 'Tarjeta de crédito':
            case 'Tarjeta de débito':
                return (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Número de la tarjeta"
                            keyboardType="numeric"
                            onChangeText={(value) => handleInputChange('numeroTarjeta', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre en la tarjeta"
                            onChangeText={(value) => handleInputChange('nombreTarjeta', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Fecha de vencimiento (MM/AA)"
                            onChangeText={(value) => handleInputChange('fechaVencimiento', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Código CVV"
                            keyboardType="numeric"
                            onChangeText={(value) => handleInputChange('cvv', value)}
                        />
                    </>
                );
            case 'PayPal':
                return (
                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico de PayPal"
                        keyboardType="email-address"
                        onChangeText={(value) => handleInputChange('emailPayPal', value)}
                    />
                );
            case 'Transferencia Bancaria':
                return (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Número de cuenta"
                            keyboardType="numeric"
                            onChangeText={(value) => handleInputChange('numeroCuenta', value)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Código SWIFT/IBAN"
                            onChangeText={(value) => handleInputChange('codigoSWIFT', value)}
                        />
                    </>
                );
            default:
                return <Text>No se requieren datos adicionales para este método de pago.</Text>;
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

    const handleFinalizar = () => {
        if (!metodoSeleccionado) {
            Alert.alert('Error', 'Por favor, selecciona un método de pago.');
            return;
        }

        // Aquí podrías hacer validaciones adicionales para los campos de datos de pago
        if (metodoSeleccionado.nombre_metodo === 'Tarjeta de Crédito' || metodoSeleccionado.nombre_metodo === 'Tarjeta de Débito') {
            if (!datosPago.numeroTarjeta || !datosPago.nombreTarjeta || !datosPago.fechaVencimiento || !datosPago.cvv) {
                Alert.alert('Error', 'Por favor, completa todos los campos de la tarjeta.');
                return;
            }
        } else if (metodoSeleccionado.nombre_metodo === 'PayPal' && !datosPago.emailPayPal) {
            Alert.alert('Error', 'Por favor, ingresa el correo electrónico de PayPal.');
            return;
        }

        // Enviar los datos seleccionados y cerrarlos
        setMetodoPago({
            ...metodoSeleccionado,
            datosPago,
        });
        cerrarModal(false);
    };

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

                    {renderInputsPorMetodo()}

                    <Buttons textoBoton="Finalizar" accionBoton={handleFinalizar} />
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
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 10,
    },
});
