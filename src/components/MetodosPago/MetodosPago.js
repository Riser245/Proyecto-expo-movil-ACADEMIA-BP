import React, { useState, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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
        setDatosPago({});
    };

    const handleInputChange = (field, value) => {
        setDatosPago((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleNumeroTarjeta = (value) => {
        let formattedValue = value.replace(/\D/g, '');
        if (formattedValue.length > 16) {
            formattedValue = formattedValue.slice(0, 16);
        }
        formattedValue = formattedValue.replace(/(.{4})/g, '$1-').slice(0, 19);
        handleInputChange('numeroTarjeta', formattedValue);
    };

    const handleNombreTarjeta = (value) => {
        const formattedValue = value.replace(/[^a-zA-Z\s]/g, '');
        handleInputChange('nombreTarjeta', formattedValue);
    };

    const handleMesVencimiento = (value) => {
        // Permite que el usuario borre el contenido
        if (value === '') {
            handleInputChange('mesVencimiento', '');
            return;
        }
    
        const numericValue = parseInt(value, 10);
    
        // Permite solo números válidos entre 1 y 12
        if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 12) {
            handleInputChange('mesVencimiento', value);
        }
    };
    


    const handleAnioVencimiento = (value) => {
        // Permitir ingresar hasta 4 dígitos
        let formattedValue = value.replace(/\D/g, '').slice(0, 4);

        // Actualiza el valor en el estado
        handleInputChange('anioVencimiento', formattedValue);

        // Realiza la validación cuando el usuario haya ingresado los 4 dígitos completos
        if (formattedValue.length === 4) {
            const currentYear = new Date().getFullYear();
            const numericValue = parseInt(formattedValue, 10);

            if (numericValue < currentYear) {
                Alert.alert('Error', `El año de vencimiento no puede ser menor que ${currentYear}.`);
                handleInputChange('anioVencimiento', ''); // Borra el valor si no es válido
            }
        }
    };

    const validarFechaVencimiento = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // Los meses van de 0 a 11, por eso se suma 1.
    
        const { mesVencimiento, anioVencimiento } = datosPago;
    
        // Asegúrate de que ambos valores estén definidos
        if (!mesVencimiento || !anioVencimiento) {
            return false;
        }
    
        const vencimientoMes = parseInt(mesVencimiento, 10);
        const vencimientoAnio = parseInt(anioVencimiento, 10);
    
        // Valida que el año de vencimiento no sea menor que el año actual
        if (vencimientoAnio < currentYear) {
            return false;
        }
    
        // Si el año es el mismo, valida que el mes no sea menor que el mes actual
        if (vencimientoAnio === currentYear && vencimientoMes < currentMonth) {
            return false;
        }
    
        // Si llega hasta aquí, la fecha de vencimiento es válida
        return true;
    };
    


    const handleCvv = (value) => {
        const formattedValue = value.replace(/\D/g, '').slice(0, 3);
        handleInputChange('cvv', formattedValue);
    };

    const handleEmailPayPal = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) {
            handleInputChange('emailPayPal', value);
        }
    };

    const handleNumeroCuenta = (value) => {
        const formattedValue = value.replace(/\D/g, '');
        handleInputChange('numeroCuenta', formattedValue);
    };

    const handleCodigoSWIFT = (value) => {
        const formattedValue = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 11);
        handleInputChange('codigoSWIFT', formattedValue);
    };

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
                            value={datosPago.numeroTarjeta || ''}
                            onChangeText={handleNumeroTarjeta}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre en la tarjeta"
                            value={datosPago.nombreTarjeta || ''}
                            onChangeText={handleNombreTarjeta}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Mes de vencimiento de la tarjeta (MM)"
                            keyboardType="numeric"
                            value={datosPago.mesVencimiento || ''}
                            onChangeText={handleMesVencimiento}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Año de vencimiento de la tarjeta (AAAA)"
                            keyboardType="numeric"
                            value={datosPago.anioVencimiento || ''}
                            onChangeText={handleAnioVencimiento}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder="Código CVV"
                            keyboardType="numeric"
                            value={datosPago.cvv || ''}
                            onChangeText={handleCvv}
                        />
                    </>
                );
            case 'PayPal':
                return (
                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico de PayPal"
                        keyboardType="email-address"
                        value={datosPago.emailPayPal || ''}
                        onChangeText={handleEmailPayPal}
                    />
                );
            case 'Transferencia Bancaria':
                return (
                    <>
                        <TextInput
                            style={styles.input}
                            placeholder="Número de cuenta"
                            keyboardType="numeric"
                            value={datosPago.numeroCuenta || ''}
                            onChangeText={handleNumeroCuenta}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Código SWIFT/IBAN"
                            value={datosPago.codigoSWIFT || ''}
                            onChangeText={handleCodigoSWIFT}
                        />
                    </>
                );
            default:
                return <Text>No se requieren datos adicionales para este método de pago.</Text>;
        }
    };

    const handleFinalizar = () => {
        if (!metodoSeleccionado) {
            Alert.alert('Error', 'Por favor, selecciona un método de pago.');
            return;
        }

        if (!validarFechaVencimiento()) {
            Alert.alert('Error', 'La fecha de vencimiento no puede ser menor que la fecha actual.');
            return;
        }

        if (metodoSeleccionado.nombre_metodo === 'Tarjeta de crédito' || metodoSeleccionado.nombre_metodo === 'Tarjeta de débito') {
            if (!datosPago.numeroTarjeta || !datosPago.nombreTarjeta || !datosPago.mesVencimiento || !datosPago.anioVencimiento || !datosPago.cvv) {
                Alert.alert('Error', 'Por favor, completa todos los campos de la tarjeta.');
                return;
            }

            const datosFormateados = `${datosPago.numeroTarjeta},${datosPago.nombreTarjeta},${datosPago.mesVencimiento},${datosPago.anioVencimiento},${datosPago.cvv}`;
            console.log("Datos que se enviarán:", datosFormateados);
            // Aquí puedes enviar los datos a la API según corresponda
        } else if (metodoSeleccionado.nombre_metodo === 'PayPal' && !datosPago.emailPayPal) {
            Alert.alert('Error', 'Por favor, ingresa el correo electrónico de PayPal.');
            return;
        }

        // Envía los datos de método de pago
        setMetodoPago({
            ...metodoSeleccionado,
            datosPago,
        });

        // Reinicia los estados
        resetStates();
    };

    const resetStates = () => {
        setMetodoSeleccionado(null);
        setDatosPago({});
        cerrarModal(false);
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
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    metodoPagoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    metodoPagoImage: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    metodoPagoText: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 20,
    },
});
