
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
export default function Buttons({textoBoton, accionBoton}) {

    return(
        <>
        <TouchableOpacity style={styles.button} onPress={accionBoton}>
            <Text style={styles.buttonText}>{textoBoton}</Text>
        </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({

    button: {
        borderWidth: 1,
        borderColor: "#D2D7DF",
        width: '80%',
        marginLeft:43,
        borderRadius: 10,
        backgroundColor: "#D2D7DF",
        padding: 6,
        marginVertical: 3
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF", fontWeight: '800', textTransform: 'uppercase'
    }
});