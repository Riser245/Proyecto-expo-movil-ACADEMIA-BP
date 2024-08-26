import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Buttons from '../Buttons/Button';
import * as Constantes from '../../utils/constantes'

const ModalCompra = ({ visible, cerrarModal, nombreProductoModal, idDetalleModal, cantidad, setCantidad }) => {

    const ip = Constantes.IP;

    //Manejo de agregar los productos al carrito de compras
    const handleCreateDetail = async () => {

        try {
            if ((cantidad < 0)) {
                Alert.alert("Debes llenar todos los campos")
                return
            }
            else {
                const formData = new FormData();
                formData.append('idDetalle', idDetalleModal); //detalle de la compra
                formData.append('cantidadProducto', cantidad); //cantidad del producto

                const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/compras.php?action=createDetail`, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                console.log("data despues del response", idDetalleModal);
                console.log("data despues del response", cantidad);
                console.log("data despues del response", data);
                if (data.status) {
                    Alert.alert('Datos Guardados correctamente');
                    setCantidad(0)
                    cerrarModal(false);
                } else {
                    Alert.alert('Error', data.error);
                }
            }

        } catch (error) {
            Alert.alert('Ocurrió un error al crear detalle');
        }
    };

    const handleCancelCarrito = () => {
        // Lógica para agregar al carrito con la cantidad ingresada
        cerrarModal(false)
    };
    //logica para la compra del producto - agregar el producto al carrito


    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                cerrarModal(!visible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{nombreProductoModal}</Text>
                    <Text style={styles.modalText}>Cantidad:</Text>
                    <TextInput
                        style={styles.input}
                        value={cantidad}
                        onChangeText={text => setCantidad(text)}
                        keyboardType="numeric"
                        placeholder="Ingrese la cantidad"
                    />
                    <Buttons
                        textoBoton='Agregar al carrito'
                        accionBoton={() => handleCreateDetail()} />
                    <Buttons
                        textoBoton='Cancelar'
                        accionBoton={() => handleCancelCarrito()} />
                </View>
            </View>
        </Modal>
    );
};

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
        textAlign: 'center',
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

export default ModalCompra;
