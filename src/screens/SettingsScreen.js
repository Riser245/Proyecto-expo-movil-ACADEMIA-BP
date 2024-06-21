import * as React from 'react';
import { Button, Card, Searchbar, Modal, Portal, PaperProvider, overlay } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');


  return (
    <View style={styles.overlay}>
      <Text style={styles.texto}>Mis compras</Text>
      <Searchbar style={styles.search}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <Card style={{ width: 300, height: 430, marginTop: 30, marginLeft:60 }}>
        <Text style={styles.text} variant="bodyMedium">Botella con agua</Text>
        <Card.Cover style={styles.image} source={require('../imagenes/botella.png')} />
        <Card.Content>
          <Text style={styles.textoo} variant="bodyMedium">  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text eve</Text>
          <Text style={styles.text} variant="bodyMedium">Precio del producto: $55.00</Text>
          <Text style={styles.text} variant="bodyMedium">Cantidad adquirida: 18</Text>
          <Text style={styles.text} variant="bodyMedium">Descuento del producto: 52%</Text>
          <Text style={styles.text} variant="bodyMedium">Fecha de la compra: 2024-07-03</Text>
          <Text style={styles.text} variant="bodyMedium">Estado: Finalizada</Text>
        </Card.Content>
        <Card.Actions>
          <Button textColor='white' style={styles.btn}>Valorar compra</Button>
        </Card.Actions>
      </Card>

    </View>
  );
};



const styles = StyleSheet.create({
  search: {
    marginTop: 60,

  },
  texto: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 80
  },
  image: {
    width: '40%',
    height: 120,
    marginLeft:90,
    marginTop: 20
  },
  text:{
    textAlign:'center',
    marginTop: 5
  },
  textoo:{
    textAlign:'center',
    marginTop: 15,
    color:'#7D848D'
  },
  btn:{
    justifyContent:'center',
    backgroundColor:'#040457',
    width: '80%',
    marginRight:30,
    marginTop:5
  }

}
);

export default MyComponent;


