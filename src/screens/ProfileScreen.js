import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, Image } from 'react-native';
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

const ProfileScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Estados para almacenar los datos del usuario
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

  // Estado para manejar el tipo de modal (crear, editar o cambiar contraseña)
  const [modalType, setModalType] = useState('');

  // Estado para almacenar los datos del perfil del usuario
  const [profileData, setProfileData] = useState(null);

  // Constante que almacena la dirección IP del servidor
  const ip = Constantes.IP;

  // Función para obtener los datos del perfil del usuario desde el servidor
  const getProfileData = async () => {
    try {
      const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=readProfile`, {
        method: 'GET',
        credentials: 'include' // Para enviar cookies con la solicitud
      });

      const data = await response.json();
      console.log(data);
      if (data.status) {
        // Si la solicitud es exitosa, se actualizan los estados con los datos del perfil
        setProfileData(data.dataset);
        setId(data.dataset.id_cliente);
        setNombre(data.dataset.nombre_cliente);
        setApellido(data.dataset.apellido_cliente);
        setCorreo(data.dataset.correo_cliente);
        setDireccion(data.dataset.direccion_cliente);
        setDui(data.dataset.dui_cliente);
        setTelefono(data.dataset.telefono_cliente);
        setFotoCliente(data.dataset.foto_cliente);
      } else {
        // Si hay un error, se muestra una alerta
        Alert.alert('Error perfil', data.error);
      }
    } catch (error) {
      // Manejo de errores en caso de que la solicitud falle
      Alert.alert('Error', 'Ocurrió un error al obtener los datos del perfil');
    }
  };

  // Función para editar los datos del usuario
  const handleEditUser = async () => {
    try {
      const formData = new FormData();
      formData.append('idCliente', idCliente);
      formData.append('nombreCliente', nombre);
      formData.append('apellidoCliente', apellido);
      formData.append('correoCliente', correo);
      formData.append('direccionCliente', direccion);
      formData.append('duiCliente', dui);
      formData.append('telefonoCliente', telefono);
      
      if (foto) {
        // Construir URI del archivo
        const fileUri = `${FileSystem.documentDirectory}${foto}`;
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        if (fileInfo.exists) {
          formData.append('fotoInput', {
            uri: fileUri,
            name: foto,
            type: 'image/jpeg', // Ajusta el tipo según corresponda
          });
        } else {
          console.log('Archivo no encontrado:', fileUri);
          Alert.alert('Error', 'Archivo de imagen no encontrado.');
          return; // Salir si el archivo no existe
        }
      }
  
      const response = await fetch(`${ip}/AcademiaBP_EXPO/api/services/public/cliente.php?action=editProfile`, {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text(); // Obtén la respuesta como texto para depuración
      console.log(responseText);
  
      const data = JSON.parse(responseText); // Asegúrate de parsear el texto a JSON
      console.log(data);
  
      if (data.status) {
        Alert.alert('Éxito', data.message);
        setIsModalVisible(false);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error al editar el usuario:', error);
      Alert.alert('Error', `Ocurrió un error al editar el usuario: ${error.message}`);
    }
  };
  
  // Función para cambiar la contraseña del usuario
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
        Alert.alert('Éxito', data.message);
        setIsModalVisible(false);
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      Alert.alert('Error', `Ocurrió un error al cambiar la contraseña: ${error.message}`);
    }
  };

  // Función para abrir el modal de edición
  const openEditModal = () => {
    setModalType('edit');
    setIsModalVisible(true);
  };

  // Función para abrir el modal de cambio de contraseña
  const openChangePassword = () => {
    setModalType('password');
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Función para manejar el envío del formulario según el tipo de modal
  const handleSubmit = () => {
    if (modalType === 'edit') {
      handleEditUser();
    } else if (modalType === 'password') {
      handleChangePassword();
    }
  };

  // Uso del hook useEffect para obtener los datos del perfil cuando el componente se monta
  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <Text style={styles.texto1}>Perfil</Text>
        <Image style={styles.image} source={require('../imagenes/usuario.png')}></Image>
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
  image: {
    width: '30%',
    height: 110,
    backgroundColor: 'white',
    borderRadius: 100,
    borderColor: 'white'
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
    marginTop: 20,
    backgroundColor: '#D2D7DF',
    marginBottom: 20,
    width: '95%',
    marginLeft: 12
  },
  inactivo: {
    opacity: 0.5,  // Cambia la opacidad para indicar que está inactivo
    pointerEvents: 'none'  // Evita que responda a eventos de toque
  }
});

export default ProfileScreen;
