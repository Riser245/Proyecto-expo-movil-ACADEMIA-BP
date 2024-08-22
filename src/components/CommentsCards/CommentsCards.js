import { StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Constantes from '../../utils/constantes';

const ip = Constantes.IP;

// Mandamos como parámetros lo que vamos a mostrar en las cards de los comentarios
export default function Comments({ comentarioProducto, calificacionProducto, nombreCliente, apellidoCliente, fechaValoracion, imagenCliente }) {

  // Función para generar las estrellas
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      let name = i <= rating ? 'star' : 'star-o';
      stars.push(<FontAwesome key={i} name={name} size={24} color="#408840" />);
    }
    return stars;
  };

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Image
          source={{ uri: `${ip}/AcademiaBP_EXPO/api/images/clientes/${imagenCliente}` }}
          style={styles.image}
          resizeMode="contain" // Ajustar la imagen al contenedor
        />
        <Text style={styles.textA}>{nombreCliente} {apellidoCliente}</Text>
        <Text style={styles.textF}>{fechaValoracion}</Text>
      </View>
      <Text style={styles.textComment}>{comentarioProducto}</Text>
      <View style={styles.starsContainer}>
        {renderStars(calificacionProducto)}
        <Text style={styles.textRating}>{calificacionProducto}</Text>
      </View>
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
    marginBottom: 10,
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
  textRating: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 10, // Espacio entre las estrellas y la calificación
    textAlign: 'center',
  },
  textComment: {
    fontSize: 15,
    marginBottom: 20,
    fontWeight: '200',
    textAlign: 'left',
  },
  textTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  textA: {
    fontSize: 11,
    marginBottom: 8,
    fontWeight: '700',
    marginRight: 30, // Espacio entre los textos
  },
  textF: {
    fontSize: 10,
    marginBottom: 8,
    fontWeight: '700',
    marginRight: 10, // Espacio entre los textos
  },
  infoContainer: {
    flexDirection: 'row', // Organiza los elementos en una fila
    justifyContent: 'space-between', // Espacio entre los elementos
    alignItems: 'center', // Alinea los elementos verticalmente en el centro
    marginBottom: 8, // Espacio abajo del contenedor
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // Alinea verticalmente en el centro
    marginBottom: 8,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 30, // Si quieres que la imagen sea circular
  }
  
});
