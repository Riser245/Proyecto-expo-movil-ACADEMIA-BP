import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Importamos el ícono
import * as Constantes from '../../utils/constantes';

const ip = Constantes.IP;

// Función para validar y convertir los valores a números
const toNumber = (value) => {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
};

// Calcula el precio total con descuento
const calcularPrecioTotal = (precioProducto, cantidad, descuento) => {
  precioProducto = toNumber(precioProducto);
  cantidad = toNumber(cantidad);
  descuento = toNumber(descuento);
  
  return (precioProducto * cantidad) - (precioProducto * cantidad * descuento / 100);
};

export default function ComprasViews({ ip, idOrden, idDetalle, imagenProducto, nombreProducto, precioProducto,
    cantidad, descuentoProducto, fechaCompra, estado, accionBotonCompras
}) {

  // Calcula el precio total
  const precioTotal = calcularPrecioTotal(precioProducto, cantidad, descuentoProducto).toFixed(2);

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Text style={styles.text}><Text style={styles.textA}>Orden número: </Text>{idOrden}</Text>
        <Text style={styles.text}><Text style={styles.textA}>Detalle número: </Text>{idDetalle}</Text>
        <Image
          source={{ uri: `${ip}/AcademiaBP_EXPO/api/images/productos/${imagenProducto}` }}
          style={styles.image}
          resizeMode="contain" // Ajustar la imagen al contenedor
        />
      </View>
      <Text style={styles.textTitle1}>{nombreProducto}</Text>
      <Text style={styles.textTitle}><Text style={styles.textA}>Precio: </Text> <Text style={styles.textDentro}>${precioProducto}</Text></Text>
      <Text style={styles.textTitle}><Text style={styles.textA}>Cantidad adquirida: </Text>{cantidad}</Text>
      <Text style={styles.textTitle}><Text style={styles.textA}>Descuento del producto: </Text>{descuentoProducto}%</Text>
      <Text style={styles.textTitle}><Text style={styles.textA}>Total de la compra: </Text>${precioTotal}</Text>
      <Text style={styles.textTitle}><Text style={styles.textA}>Fecha de la compra: </Text>{fechaCompra}</Text>
      <Text style={styles.textTitle}><Text style={styles.textA}>Estado de la compra: </Text>{estado}</Text>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={accionBotonCompras}>
        <FontAwesome name="star" size={24} color="white" />
        <Text style={styles.cartButtonText}>Valorar compra</Text>
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
  textTitle1: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: '700',
    textAlign: 'center', // Centrar el texto
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8,
  },

  textA: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '700'
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
    backgroundColor: '#007bff',
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
  },
  textDentro: {
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
});
