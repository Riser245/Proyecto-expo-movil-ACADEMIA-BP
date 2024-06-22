import * as React from 'react';
import { Button, Card, Searchbar, Modal, Portal, PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');


  return (
    <View style={styles.ovelay}>
      <Text style={styles.texto}>Carrito</Text>
      <Searchbar style={styles.search}
        placeholder="Buscar"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      

      <View style={styles.container1}>

      </View>

      <View style={styles.container}>

        <Card style={{ width: 180, height: 250, marginTop: 50 }}>
            <Card.Cover style={styles.image} source={require('../imagenes/pelota.png')} />
          <Card.Content>
            <Text style={styles.texto2} variant="titleLarge">Balón de fútbol</Text>
          </Card.Content>
          <Card.Actions>
          <Text style={styles.btn1}>$894</Text>
            <Button style={styles.btn2}><MaterialIcons name="remove-shopping-cart" size={22} color="red" /></Button>
          </Card.Actions>
        </Card>

        <Card style={{ width: 180, height: 250, marginTop: 50 }}>
          <Card.Cover style={styles.image} source={require('../imagenes/camisa.png')} />
          <Card.Content>
            <Text style={styles.texto2} variant="titleLarge">Camisa deportiva</Text>
          </Card.Content>
          <Card.Actions>
          <Text style={styles.btn1}>$894</Text>
            <Button style={styles.btn2}><MaterialIcons name="remove-shopping-cart" size={22} color="red" /></Button>
          </Card.Actions>
        </Card>

      </View>

      <View style={styles.container}>

        <Card style={{ width: 180, height: 250, marginTop: 50 }}>
          <Card.Cover style={styles.image} source={require('../imagenes/botella.png')} />
          <Card.Content>
            <Text style={styles.texto2} variant="titleLarge">Botella con agua</Text>
          </Card.Content>
          <Card.Actions>
          <Text style={styles.btn1}>$894</Text>
            <Button style={styles.btn2}><MaterialIcons name="remove-shopping-cart" size={22} color="red" /></Button>
          </Card.Actions>
        </Card>

        <Card style={{ width: 180, height: 250, marginTop: 50 }}>
          <Card.Cover style={styles.image} source={require('../imagenes/camisa2.png')} />
          <Card.Content>
            <Text style={styles.texto2} variant="titleLarge">camisa deportiva 2</Text>
          </Card.Content>
          <Card.Actions>
          <Text style={styles.btn1}>$894</Text>
            <Button style={styles.btn2}><MaterialIcons name="remove-shopping-cart" size={22} color="red" /></Button>
          </Card.Actions>
        </Card>

      </View>



    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    color: 'white'
  },
  search: {
    marginTop: 20,
    paddingHorizontal: 20,

  },
  texto: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 80,
  },
  texto2: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
  },
  textContainer: {
    padding: 10,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  precio: {
    fontSize: 14,
    color: '#555',
  },
  btn1: {
    fontSize: 15,
    alignItems: 'flex-start',
    borderColor: 'transparent',
    fontColor: 'black',
  },
  btn2: {
    alignItems: 'flex-start',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    height: 45
  },
  btn3:{
    borderColor:'black',
    alignItems: 'flex-end',
  },  
  btn:{
    borderColor:'black',
    backgroundColor: '#040457',
    marginTop:20,
  }
});

export default MyComponent;


