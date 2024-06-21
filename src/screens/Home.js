import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, FlatList, Dimensions, Image } from 'react-native';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';

const { width, height } = Dimensions.get('window');

export default function Home({ navigation }) {
  const [nombre, setNombre] = useState(null);
  const ip = Constantes.IP;

  const handleLogout = async () => {
    try {
      const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=logOut`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=getUser`, {
        method: 'GET'
      });
      const data = await response.json();
      if (data.status) {
        setNombre(data.username);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al obtener el usuario');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const data = [
    { key: '1', title: 'Monumental Estadio Cuscatlán', description: "Martes y jueves: 4:00 P.M - 6:00 P.M. Sábado: 9:00 A.M. - 12:00 P.M.", image: require('../imagenes/cusca.png') },
    { key: '2', title: 'Complejo deportivo UCA', description: "Martes y jueves: 4:00 P.M - 6:00 P.M. Sábado: 9:00 A.M. - 12:00 P.M.", image: require('../imagenes/cusca.png') },
    { key: '3', title: 'Cumbres de Cuscatlán', description: "Martes y jueves: 4:00 P.M - 6:00 P.M. Sábado: 9:00 A.M. - 12:00 P.M.", image: require('../imagenes/cusca.png') }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.circle}>
            <Text style={styles.emailText}>{nombre ? nombre : 'No hay correo para mostrar'}</Text>
          </View>
          <Buttons
            textoBoton='Cerrar Sesión'
            accionBoton={handleLogout}
          />
        </View>
        <Text style={styles.titleHeader}>Bienvenid@</Text>
        <Text>Información sobre nosotros</Text>
      </View>
      
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    top: 10,
    left: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 130,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 10,
  },
  emailText: {
    color: '#000',
    textAlign: 'center',
  },
  flatList: {
    width: '100%',
    height: '100%',
    marginVertical: 10,
  },
  item: {
    width: width * 0.9,
    height: 300,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    borderWidth: 2,
    borderColor: "black",
    width: 100,
    borderRadius: 10,
    backgroundColor: "darkblue",
  },
  buttonText: {
    textAlign: 'center',
    color: "white",
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 5,
    color: '#5C3D2E', // Brown color for the title
  },
});
