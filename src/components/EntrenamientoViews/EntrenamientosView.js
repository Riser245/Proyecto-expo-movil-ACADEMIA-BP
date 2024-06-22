
import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons'; // Importamos el ícono
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes';
//recibimos por props la imagen del producto, nombre, precio y otras propiedades de productos para mostrarlas en el componente de 
//productoCard
const ip = Constantes.IP;

export default function EntrenamientoView({ ip, idLugar, imagenLugar, nombrelugar, horariosE}) {

  return (

    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${ip}/AcademiaBP_EXPO/api/images/lugares_entreno/${imagenLugar}` }}
          style={styles.image}
          resizeMode="contain" // Ajustar la imagen al contenedor
        />
      </View>
      
      <Text style={styles.textTitle}>{nombrelugar}</Text>
      <Text style={styles.text}>{horariosE}</Text>
      
    </View>

  );
}


const styles = StyleSheet.create({
  containerFlat: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#EAD8C0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight || 0,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 1,
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8, fontWeight: '700'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#AF8260',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  image: {
    width: '85%',
    height: 150,
    borderRadius: 8,
    marginBottom: 12,
  },
  imageContainer: {
    alignItems: 'center', // Centrar imagen horizontalmente
  }, textDentro: {
    fontWeight: '400'
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6D0E0E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  cartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
    textAlign: 'center'
  },
});

