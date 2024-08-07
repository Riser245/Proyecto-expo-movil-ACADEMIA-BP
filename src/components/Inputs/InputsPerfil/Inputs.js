import { StyleSheet, TextInput } from 'react-native';

export default function Inputs({ placeHolder, setValor, contra, setTextChange }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeHolder}
      value={setValor}
      placeholderTextColor={'#000'}
      secureTextEntry={contra}
      onChangeText={setTextChange}
      editable = {false}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FCF9F9',
    borderBottomColor: '#000', // Color del borde inferior
    color: '#000', // Color del texto
    fontWeight: '800',
    width: 160,
    borderRadius: 25,
    padding: 5,
    marginVertical: 10
  },
});
