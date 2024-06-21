import * as React from 'react';
import { Button, Card, Searchbar, Modal, Portal, PaperProvider } from 'react-native-paper';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');


  return (
    <View style={styles.ovelay}>
      <Text style={styles.texto}>Productos</Text>
      <Searchbar style={styles.search}
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <View style={styles.container1}>
      <Button style={styles.btn} >todos</Button>

      <Button style={styles.btn} >camisetas</Button>

      <Button style={styles.btn} >botellas</Button>

      <Button style={styles.btn} >balones</Button>
      </View>

      <View style={styles.container}>

        <Card style={{ width: 180, height: 200, marginTop: 30 }}>
            <Card.Cover style={styles.image} source={require('../imagenes/pelota.png')} />
          <Card.Content>
            <Text style={styles.texto2} variant="titleLarge">Balón de fútbol</Text>
          </Card.Content>
          <Card.Actions>
            <Button style={styles.btn1} >$894</Button>
            <Button style={styles.btn2}><MaterialIcons name="add-shopping-cart" size={22} color="black" /></Button>
          </Card.Actions>
        </Card>

        <Card style={{ width: 180, height: 200, marginTop: 30 }}>
          <Card.Cover style={styles.image} source={require('../imagenes/camisa.png')} />
          <Card.Content>
            <Text style={styles.texto2} variant="titleLarge">Camisa deportiva</Text>
          </Card.Content>
          <Card.Actions>
            <Button style={styles.btn1} >$894</Button>
            <Button style={styles.btn2}><MaterialIcons name="add-shopping-cart" size={22} color="black" /></Button>
          </Card.Actions>
        </Card>

      </View>

      <View style={styles.container}>

        <Card style={{ width: 180, height: 200, marginTop: 30 }}>
          <Card.Cover style={styles.image} source={require('../imagenes/botella.png')} />
          <Card.Content>
            <Text style={styles.texto2} variant="titleLarge">Botella con agua</Text>
          </Card.Content>
          <Card.Actions>
            <Button style={styles.btn1} >$894</Button>
            <Button style={styles.btn2}><MaterialIcons name="add-shopping-cart" size={22} color="black" /></Button>
          </Card.Actions>
        </Card>

        <Card style={{ width: 180, height: 200, marginTop: 30 }}>
          <Card.Cover style={styles.image} source={require('../imagenes/camisa2.png')} />
          <Card.Content>
            <Text style={styles.texto2} variant="titleLarge">camisa deportiva 2</Text>
          </Card.Content>
          <Card.Actions>
            <Button style={styles.btn1} >$894</Button>
            <Button style={styles.btn2}><MaterialIcons name="add-shopping-cart" size={22} color="black" /></Button>
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
    marginTop: 10,

  },
  texto: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 80
  },
  texto2: {
    textAlign: 'center',
    fontSize: 16,
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
    height: 120,
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
    fontSize: 20,
    alignItems: 'flex-start',
    borderColor: 'transparent',
  },
  btn2: {
    alignItems: 'flex-start',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    height: 45
  },  
  btn:{
    borderColor:'black',
    backgroundColor: '#040457',
    marginTop:20
  }
});

export default MyComponent;


