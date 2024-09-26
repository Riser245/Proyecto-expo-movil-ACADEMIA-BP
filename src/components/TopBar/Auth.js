// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Constantes from '../../utils/constantes';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';

const useAuth = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [user, setUser] = useState({ firstName: '', lastName: '' });
    const navigation = useNavigation();
    const ip = Constantes.IP;

    const getUser = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });
            const data = await response.json();
            
            if (data.status) {
                const [firstName, ...lastNameParts] = data.nombre.split(' ');
                const lastName = data.apellido || '';
                setUser({
                    firstName: firstName || '',
                    lastName: lastName || ''
                });
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener el usuario');
        }
    };

    const formatUsername = () => {
        const { firstName, lastName } = user;
        const firstInitial = firstName ? firstName.charAt(0) : '';
        const lastInitial = lastName ? lastName.charAt(0) : '';
        return `${firstInitial}${lastInitial}`; //Se mostrará la primer letra del primer nombre y la primer del primer apellido.
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=logOut`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getUser();
        }, [])
    );

    return {
        getUser,
        formatUsername,
        handleLogout,
    };
};

export default useAuth;
