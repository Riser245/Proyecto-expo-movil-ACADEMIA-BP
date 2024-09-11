import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import Buttons from '../Buttons/Button';
import { Rating } from 'react-native-ratings';
import * as Constantes from '../../utils/constantes';

const ModalValoracion = ({ visible, cerrarModal, idDetalle, calificacion, comentario }) => {
  const ip = Constantes.IP;
  const [rating, setRating] = useState(calificacion || 0);
  const [comment, setComment] = useState(comentario || '');

  //Manejo del envío de la valoración hacia productos comprados
  //La calificación se hará por medio de estrellas, y se enviará
  //Un comentario sobre el producto
  const handleCreateRating = async () => {
    try {
      //No podrá mandarse una calificación menor a 1
      if (rating < 1) {
        Alert.alert('Debes llenar todos los campos');
        return;
      } else {
        const formData = new FormData();
        formData.append('idDetalle', idDetalle); //Detalle de la compra
        formData.append('calificacion', rating); //Calificación
        formData.append('comentario', comment); //Comentario

        const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/valoracion.php?action=createRating`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        console.log('data despues del response', data);
        if (data.status) {
          Alert.alert('Valoración enviada correctamente');
          cerrarModal(false);
          setRating('')
          setComment('')
        } else {
          Alert.alert('Error', data.error);
        }
      }
    } catch (error) {
      Alert.alert('Ocurrió un error al enviar la valoración');
    }
  };

  const handleCancelValoracion = () => {
    cerrarModal(false);
  };

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
          <Text style={styles.modalText}>Detalle: {idDetalle}</Text>
          
          <Rating
            type='star'
            startingValue={rating}
            imageSize={40}
            showRating={false}
            onFinishRating={(rating) => setRating(rating)}
            selectedColor="#6D0E0E" // Rojo
            style={styles.rating}
          />

          <Text style={styles.selectedRating}>
            Estrellas seleccionadas: {rating}
          </Text>

          <TextInput
            style={styles.textArea}
            placeholder="Escribe tu comentario"
            value={comment}
            onChangeText={(text) => setComment(text)}
            multiline={true}
            numberOfLines={4}
          />

          <Buttons
            textoBoton='Enviar mi valoración'
            accionBoton={() => handleCreateRating()}
          />
          <Buttons
            textoBoton='Cancelar'
            accionBoton={() => handleCancelValoracion()}
          />
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
  rating: {
    marginBottom: 20,
  },
  selectedRating: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 200,
    height: 100,
    textAlignVertical: 'top',
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

export default ModalValoracion;
