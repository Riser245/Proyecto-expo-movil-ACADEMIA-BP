
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useState } from 'react';
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
        borderColor: "#040457",
        width: 200,
        borderRadius: 10,
        backgroundColor: "#040457",
        padding: 10,
        marginVertical: 5
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFF", fontWeight: '800', textTransform: 'uppercase'
    }
});