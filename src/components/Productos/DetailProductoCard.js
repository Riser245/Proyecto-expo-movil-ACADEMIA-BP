import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, ScrollView, SafeAreaView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons'; // Importamos el ícono
import Constants from 'expo-constants';
import * as Constantes from '../../utils/constantes';
//recibimos por props la imagen del producto, nombre, precio y otras propiedades de productos para mostrarlas en el componente de 
//productoCard
const ip = Constantes.IP;

export default function DetailProductCard({ ip, imagenProducto, idProducto, nombreProducto, descripcionProducto
  , precioProducto, existenciasProducto, descuentoProducto, talla, color, accionBotonProducto
}) {

  return (

    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${ip}/AcademiaBP_EXPO/api/images/productos/${imagenProducto}` }}
          style={styles.image}
          resizeMode="contain" // Ajustar la imagen al contenedor
        />
      </View>
      <Text style={styles.textTitle}>{idProducto}</Text>
      <Text style={styles.textTitle}>{nombreProducto}</Text>
      <Text style={styles.text}>{descripcionProducto}</Text>
      <Text style={styles.text}>Precio: ${precioProducto}</Text>
      <Text style={styles.text}>Existencias: {existenciasProducto}</Text>
      <Text style={styles.text}>Descuento: {descuentoProducto}%</Text>
      <Text style={styles.text}>Talla: {talla}</Text>
      <View style={styles.colorContainer}>
        <Text style={styles.text}>Color:</Text>
        <View style={[styles.colorBox, { backgroundColor: "#" + color }]} />
      </View>
      
      <TouchableOpacity
        style={styles.cartButton}
        onPress={accionBotonProducto}>
        <FontAwesome name="plus-circle" size={24} color="white" />
        <Text style={styles.cartButtonText}>Agregar al carrito</Text>
      </TouchableOpacity>
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
    backgroundColor: '#040457',
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
    backgroundColor: '#040457',
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
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    marginLeft: 8,
  },
});
