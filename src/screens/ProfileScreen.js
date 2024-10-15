import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import * as Constantes from '../utils/constantes';
import UserModal from '../Modales/UserModal';
import Input from '../components/Inputs/InputsPerfil/Inputs';
import InputMultiline from '../components/Inputs/InputsPerfil/InputMultiline';
import MaskedInputTelefono from '../components/Inputs/InputsPerfil/MaskedInputTelefono';
import MaskedInputDui from '../components/Inputs/InputsPerfil/MaskedInputDui';
import InputEmail from '../components/Inputs/InputsPerfil/InputEmail';
import Buttons from '../components/Inputs/InputsPerfil/Buttons/Button';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import CustomAlertError from '../components/CustomAlert/CustomAlertError';
import CustomAlertExito from '../components/CustomAlert/CustomAlertSuccess';

const ProfileScreen = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [idCliente, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dui, setDui] = useState('');
    const [telefono, setTelefono] = useState('');
    const [foto, setFotoCliente] = useState('');
    const [clave, setClave] = useState('');
    const [confirmarClave, setConfirmar] = useState('');
    const [modalType, setModalType] = useState('');
    const [profileData, setProfileData] = useState(null);
    const ip = Constantes.IP;
    const [errorVisible, setErrorVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    //Obtenemos los datos del cliente que ha iniciado sesión
    const getProfileData = async () => {
        try {
            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=readProfile`, {
                method: 'GET',
                credentials: 'include'
            });

            const data = await response.json();
            if (data.status) {
                setProfileData(data.dataset); //Inicio de asignación de datos
                setId(data.dataset.id_cliente); //id del cleinte
                setNombre(data.dataset.nombre_cliente); //nombre
                setApellido(data.dataset.apellido_cliente); //apellido
                setCorreo(data.dataset.correo_cliente); //correo
                setDireccion(data.dataset.direccion_cliente); //dirección
                setDui(data.dataset.dui_cliente); //dui
                setTelefono(data.dataset.telefono_cliente); //telefono
                setFotoCliente(`${ip}/AcademiaBP_EXPO/api/images/clientes/${data.dataset.foto_cliente}`); //foto del cliente
            } else {
                Alert.alert('Error perfil', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del perfil');
        }
    };

    //Método para abrir la galería de fotos del usuario
    //Este método se utilizará para actualizar la foto del perfil del usuario
    const openGalery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [8, 8],
            quality: 1,
        });
        if (!result.canceled) {
            const imageWidth = result.assets[0].width;
            const imageHeight = result.assets[0].height;
            //Validamos que la imagen no sobre pase el ancho y alto definido
            if (imageWidth <= 1800 && imageHeight <= 1800) {
                setFotoCliente(result.assets[0].uri);
            } else {
                alert('La imagen es de dimension ' + imageWidth + 'x' + imageHeight + '.La imagen seleccionada debe tener dimensiones de 1800x1800 píxeles o menores.');
            }
        }
    };

    //Método para actualizar los datos del cliente
    const handleEditUser = async () => {
        try {
            let localUri = foto; //Aquí se guarda la ubicación de la foto dentro de la api
            let fileName = "";
            let match = "";
            let type = "";
            if (localUri == null || localUri == "") {
                Alert.alert("Selecciona una imagen");
            } else {
                //Aquí se define el tipo de archivo que tiene la imagen, ya sea png, jpg, jpeg, etc.
                fileName = localUri.split('/').pop();
                match = /\.(\w+)$/.exec(fileName);
                type = match ? `image/${match[1]}` : `image`;
            }
            const formData = new FormData(); //Al abrir la modal, se asignarán los datos a cada input
            formData.append('idCliente', idCliente);
            formData.append('nombreCliente', nombre);
            formData.append('apellidoCliente', apellido);
            formData.append('correoCliente', correo);
            formData.append('direccionCliente', direccion);
            formData.append('duiCliente', dui);
            formData.append('telefonoCliente', telefono);
            //Para la foto, mandamos la ubicación, el nombre y el tipo, que se reconoce dentro del ELSE
            formData.append('fotoInput', {
                uri: localUri,
                name: fileName,
                type
            });

            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=editProfile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                },
                body: formData
            });

            const responseText = await response.text();

            const data = JSON.parse(responseText);

            if (data.status) {
                setAlertMessage('¡Éxito al actualizar!');
                setSuccessVisible(true);
                setIsModalVisible(false);
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {

            setAlertMessage(error);
            setErrorVisible(true);
        }
    };

    //Método para cambiar la contraseña
    const handleChangePassword = async () => {
        try {
            const formData = new FormData();
            formData.append('claveActual', clave);
            formData.append('claveNueva', confirmarClave);
            formData.append('confirmarClave', confirmarClave);

            const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=changePassword`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.status) {
                setAlertMessage('¡Contraseña actualizada!');
                setSuccessVisible(true);
                setIsModalVisible(false);
                setClave('');
                setConfirmar('');
            } else {
                setAlertMessage(data.error);
                setErrorVisible(true);
            }
        } catch (error) {

            setAlertMessage('Error al cambiar la contraseña');
            setErrorVisible(true);
        }
    };

    //Método para mostrar la modal para editar los datos del cliente
    const openEditModal = () => {
        setModalType('edit');
        setIsModalVisible(true);
    };

    //Método para mostrar la modal para editar la contraseña
    const openChangePassword = () => {
        setModalType('password');
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    //Método para mandar los datos a la base
    const handleSubmit = () => {
        if (modalType === 'edit') {
            handleEditUser();
        } else if (modalType === 'password') {
            handleChangePassword();
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getProfileData();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.container3}>
                <Text style={styles.texto1}>Perfil</Text>

                <View style={styles.imageContainer}>
                    {foto ? (
                        <Image style={styles.image} source={{ uri: foto }} />
                    ) : (
                        <Image style={styles.image} source={require('../imagenes/usuario.png')} />
                    )}
                    <TouchableOpacity style={styles.editButton} onPress={openGalery}>
                        <Text style={styles.editButtonText}>Editar</Text>
                    </TouchableOpacity>
                </View>

                <CustomAlertError
                    visible={errorVisible}
                    onClose={() => setErrorVisible(false)}
                    message={alertMessage}
                />
                <CustomAlertExito
                    visible={successVisible}
                    onClose={() => setSuccessVisible(false)}
                    message={alertMessage}
                />

                <Text style={styles.texto2}>Información del usuario</Text>
            </View>

            <View style={styles.container2}>
                <Card style={styles.card}>
                    <Card.Content style={styles.inputs}>
                        <Input
                            placeHolder='Nombre Cliente'
                            setValor={nombre}
                            setTextChange={setNombre}
                            editable={!isModalVisible}
                            style={isModalVisible ? styles.inactivo : {}}
                        />
                        <Input
                            placeHolder='Apellido Cliente'
                            setValor={apellido}
                            setTextChange={setApellido}
                            editable={!isModalVisible}
                            style={isModalVisible ? styles.inactivo : {}}
                        />
                    </Card.Content>
                    <Card.Content>
                        <InputEmail
                            placeHolder='Email Cliente'
                            setValor={correo}
                            setTextChange={setCorreo}
                            editable={!isModalVisible}
                            style={isModalVisible ? styles.inactivo : {}}
                        />
                        <InputMultiline
                            placeHolder='Dirección Cliente'
                            setValor={direccion}
                            valor={direccion}
                            setTextChange={setDireccion}
                            editable={!isModalVisible}
                            style={isModalVisible ? styles.inactivo : {}}
                        />
                        <MaskedInputDui
                            dui={dui}
                            setDui={setDui}
                            editable={!isModalVisible}
                            style={isModalVisible ? styles.inactivo : {}}
                        />
                        <MaskedInputTelefono
                            telefono={telefono}
                            setTelefono={setTelefono}
                            editable={!isModalVisible}
                            style={isModalVisible ? styles.inactivo : {}}
                        />
                    </Card.Content>
                </Card>

                <Buttons
                    textoBoton="Editar datos"
                    accionBoton={openEditModal}
                />
                <Buttons
                    textoBoton="Cambiar contraseña"
                    accionBoton={openChangePassword}
                />
                <UserModal
                    isVisible={isModalVisible}
                    onClose={closeModal}
                    onSubmit={handleSubmit}
                    nombre={nombre}
                    setNombre={setNombre}
                    apellido={apellido}
                    setApellido={setApellido}
                    correo={correo}
                    setCorreo={setCorreo}
                    direccion={direccion}
                    setDireccion={setDireccion}
                    dui={dui}
                    setDui={setDui}
                    telefono={telefono}
                    setTelefono={setTelefono}
                    fotoo={foto}
                    setFotoo={setFotoCliente}
                    clave={clave}
                    setClave={setClave}
                    confirmarClave={confirmarClave}
                    setConfirmarClave={setConfirmar}
                    modalType={modalType}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    container2: {
        backgroundColor: 'white',
        width: '100%',
        height: '70%',
    },
    container3: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '40%',
        borderRadius: 20,
        color: 'white'
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: 110,
        height: 110,
        backgroundColor: 'white',
        borderRadius: 100,
        borderColor: 'white'
    },
    editButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
    },
    editButtonText: {
        color: 'black',
        fontSize: 10,
        fontWeight: 'bold',
    },
    texto1: {
        color: 'white',
        marginBottom: 20,
        fontSize: 20,
        marginTop: 50
    },
    texto2: {
        color: 'white',
        marginTop: 20,
        fontSize: 20
    },
    btn: {
        marginTop: 20,
        height: 50
    },
    inputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    card: {
        marginTop: 15,
        backgroundColor: '#D2D7DF',
        marginBottom: 10,
        width: '95%',
        marginLeft: 12
    },
    inactivo: {
        opacity: 0.5,
        pointerEvents: 'none'
    }
});

export default ProfileScreen;
