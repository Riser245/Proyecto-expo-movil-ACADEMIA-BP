import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';

const { width } = Dimensions.get('window');

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

  const data1 = [{ key: 'Item 1' }, { key: 'Item 2' }, { key: 'Item 3' }];
  const data2 = [{ key: 'Item A' }, { key: 'Item B' }, { key: 'Item C' }];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.key}</Text>
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
        <Text style={styles.title}>Bienvenid@</Text>
      </View>
      
      <ScrollView horizontal style={styles.scrollView}>
        <FlatList
          data={data1}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          style={styles.flatList}
          horizontal
        />
        <FlatList
          data={data2}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          style={styles.flatList}
          horizontal
        />
      </ScrollView>
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
  scrollView: {
    width: '100%',
    marginTop: 20,
  },
  flatList: {
    width: '90%',
  },
  item: {
    width: width * 0.9,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
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
  title: {
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
