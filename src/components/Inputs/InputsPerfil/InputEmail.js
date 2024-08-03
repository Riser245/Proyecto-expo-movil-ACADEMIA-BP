
import { StyleSheet, TextInput} from 'react-native';

export default function InputEmail({placeHolder, setValor, setTextChange}) {

  return (

    <TextInput
    style={styles.Input}
    placeholder={placeHolder}
    value={setValor}
    placeholderTextColor={'#000'}
    onChangeText={setTextChange}
    keyboardType="email-address"
    />

  );
}

const styles = StyleSheet.create({
  Input: {
    backgroundColor: '#FCF9F9',
    borderBottomColor: '#000', // Color del borde inferior
    color: '#000', // Color del texto
    fontWeight: '800',
    width: '100%',
    marginTop:10,
    borderRadius:25,
    padding: 2,
    marginVertical: 10
  },

});