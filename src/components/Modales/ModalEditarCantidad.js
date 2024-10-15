import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import Buttons from '../Buttons/Button';
import * as Constantes from '../../utils/constantes';
import CustomAlertError from '../CustomAlert/CustomAlertError';
import CustomAlertExito from '../CustomAlert/CustomAlertSuccess';

const ModalEditarCantidad = ({ setModalVisible, modalVisible, idDetalle, setCantidadProductoCarrito, cantidadProductoCarrito, getDetalleCarrito }) => {

    const ip = Constantes.IP;
    const [errorVisible, setErrorVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    //Manejo de la edición de cantidad de producto del carrito
    const handleUpdateDetalleCarrito = async () => {
        try {
            //En caso de que la cantidad que se ingrese sea menor a cero, se muestra un mensaje de error
            if (cantidadProductoCarrito <= 0) {
                setAlertMessage("La cantidad no puede ser igual o menor a 0");
                setErrorVisible(true);
                return;
            }

            const formData = new FormData();
            formData.append('idDetalle', idDetalle);
            formData.append('cantidadProducto', cantidadProductoCarrito);

            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/compras.php?action=updateDetail`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status) {
                setAlertMessage('Se actualizo el detalle del producto');
                setSuccessVisible(true);
                getDetalleCarrito();
            } else {
                setAlertMessage('Error al editar detalle del carrito', data.error);
                setErrorVisible(true);
            }
            setModalVisible(false);
        } catch (error) {

            setAlertMessage(error);
            setErrorVisible(true);
            setModalVisible(false);
        }
    };

    const handleCancelEditarCarrito = () => {
        setModalVisible(false);
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Cantidad actual: {cantidadProductoCarrito}</Text>
                    <Text style={styles.modalText}>Nueva cantidad:</Text>
                    <TextInput
                        style={styles.input}
                        value={cantidadProductoCarrito}
                        onChangeText={setCantidadProductoCarrito}
                        keyboardType="numeric"
                        placeholder="Ingrese la cantidad"
                    />
                    <Buttons
                        textoBoton='Editar cantidad'
                        accionBoton={handleUpdateDetalleCarrito}
                    />
                    <Buttons
                        textoBoton='Cancelar'
                        accionBoton={handleCancelEditarCarrito}
                    />
                </View>

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
            </View>
        </Modal>
    );
};

export default ModalEditarCantidad;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        width: 200,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
