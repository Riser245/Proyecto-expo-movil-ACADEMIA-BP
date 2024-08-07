import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function MaskedInputDui({ dui, setDui }) {
    return (
        <TextInputMask
            style={styles.Input}
            placeholder="Dui"
            placeholderTextColor="#000"
            type={'custom'}
            options={{
                mask: '99999999-9' // Formato para el número de teléfono
            }}
            value={dui}
            onChangeText={setDui}
            editable = {false}
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
        borderColor:'transparent',
        borderRadius:25,
        padding: 5,
        marginVertical: 10
    },

});