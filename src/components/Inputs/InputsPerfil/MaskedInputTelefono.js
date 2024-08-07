import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputTelefono({ telefono, setTelefono }) {
    return (
        <TextInputMask
            style={styles.Input}
            placeholder="Teléfono"
            placeholderTextColor="#000"
            type={'custom'}
            options={{
                mask: '9999-9999' // Formato para el número de teléfono
            }}
            value={telefono}
            onChangeText={setTelefono}
            editable = {false}
        />
    );
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#FCF9F9',
        borderBottomColor: '#000', // Color del borde inferior
        borderBottomWidth: 1, // Ancho del borde inferior
        color: '#000', // Color del texto
        fontWeight: '800',
        width: '100%',
        marginTop: 10,
        borderColor: 'transparent',
        borderRadius: 25,
        padding: 5,
        marginVertical: 10
    },

});