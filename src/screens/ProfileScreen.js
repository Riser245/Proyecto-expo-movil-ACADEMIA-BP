import React from 'react';
import { Button, Card, TextInput } from 'react-native-paper';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <Text style={styles.texto1}>Perfil</Text>
        <Image style={styles.image} source={require('../imagenes/usuario.png')}></Image>
        <Text style={styles.texto2}>Nombre usuario</Text>
      </View>

      <View style={styles.container2}>

        <Card>
          <Card.Content style={styles.inputs}>
            <TextInput style={styles.input} label="Nombre" />
            <TextInput style={styles.input} label="Apellido" />
          </Card.Content>
          <Card.Content>
          <TextInput style={styles.inputss}  label="DUI" />
          <TextInput style={styles.inputss} label="Correo" /> 
          <TextInput style={styles.inputss}  label="Telefono" />
          <TextInput style={styles.inputss}  label="Direccion" />
          </Card.Content>
        </Card>

        <Button style={styles.btn} mode="elevated" textColor='black'><MaterialCommunityIcons name="pencil" size={24} color="#4786FF" />   Editar perfil</Button>

        <Button style={styles.btn} mode="elevated" textColor='black'><Ionicons name="log-out-outline" size={22} color="red" />    Cerrar sesión</Button>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  container2: {
    backgroundColor: 'white',
    width: '100%',
    height: '70%',
  },
  container3: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '40%',
    borderRadius: 20,
    color: 'white'
  },
  image: {
    width: '30%',
    height: 110,
    backgroundColor: 'white',
    borderRadius: 100,
    borderColor: 'white'
  }
  ,
  texto1: {
    color: 'white',
    marginBottom: 20,
    fontSize: 20,
    marginTop: 50
  },
  texto2: {
    color: 'white',
    marginTop: 20,
    fontSize: 20
  },
  btn: {
    marginTop: 20,
    height: 50
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  input: {
    width: 160,
    borderRadius: 25,
  },
  inputss: {
    width: '100%',
    marginTop:10,
    borderColor:'transparent',
    borderRadius:25
  }
});

export default ProfileScreen;