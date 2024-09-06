import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const GoBackProduct = () => {
    const navigation = useNavigation();

    const backProducts = () => {
        navigation.navigate('Productos'); // Navega de vuelta a la pantalla Productos
    };

    return (
        <TouchableOpacity onPress={backProducts}>
            <FontAwesome name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
    );
};

export default GoBackProduct;
