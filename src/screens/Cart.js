import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Searchbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.overlay}>
      <Text style={styles.texto}>Carrito</Text>
      <Searchbar
        style={styles.search}
        placeholder="Buscar"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.row}>
          <Card style={styles.card}>
            <Card.Cover style={styles.image} source={require('../imagenes/pelota.png')} />
            <Card.Content>
              <Text style={styles.texto2} variant="titleLarge">Balón de fútbol</Text>
            </Card.Content>
            <Card.Actions>
              <Text style={styles.btn1}>$894</Text>
              <Button style={styles.btn2}><MaterialIcons name="remove-shopping-cart" size={22} color="red" /></Button>
            </Card.Actions>
          </Card>

          <Card style={styles.card}>
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

        <View style={styles.row}>
          <Card style={styles.card}>
            <Card.Cover style={styles.image} source={require('../imagenes/botella.png')} />
            <Card.Content>
              <Text style={styles.texto2} variant="titleLarge">Botella con agua</Text>
            </Card.Content>
            <Card.Actions>
              <Text style={styles.btn1}>$894</Text>
              <Button style={styles.btn2}><MaterialIcons name="remove-shopping-cart" size={22} color="red" /></Button>
            </Card.Actions>
          </Card>

          <Card style={styles.card}>
            <Card.Cover style={styles.image} source={require('../imagenes/camisa2.png')} />
            <Card.Content>
              <Text style={styles.texto2} variant="titleLarge">Camisa deportiva 2</Text>
            </Card.Content>
            <Card.Actions>
              <Text style={styles.btn1}>$894</Text>
              <Button style={styles.btn2}><MaterialIcons name="remove-shopping-cart" size={22} color="red" /></Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
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
  container: {
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  card: {
    width: 180,
    height: 250,
    marginTop: 50,
  },
  image: {
    width: '100%',
    height: 160,
  },
  btn1: {
    fontSize: 15,
    color: 'black',
  },
  btn2: {
    backgroundColor: 'transparent',
    height: 45,
  },
});

export default MyComponent;
