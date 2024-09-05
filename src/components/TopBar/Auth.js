// hooks/useAuth.js
import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Constantes from '../../utils/constantes';

const useAuth = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const ip = Constantes.IP;

    const getUser = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=getUser`, {
                method: 'GET'
            });
            const data = await response.json();
            if (data.status) {
                setNombre(data.username);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener el usuario');
        }
    };

    const formatUsername = (username) => {
        if (!username) return 'No hay correo para mostrar';
        const localPart = username.split('@')[0];
        if (localPart.length < 2) return localPart;
        return localPart.charAt(0) + localPart.charAt(localPart.length - 1);
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


    return {
        getUser,
        formatUsername,
        handleLogout,
    };
};

export default useAuth;
