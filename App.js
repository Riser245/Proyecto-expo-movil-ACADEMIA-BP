import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screens/Login';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignUp from './src/screens/SignUp';
import TabNavigation from './src/navigation/tabNavigation';
import MyComponent from './src/screens/ProductScreen';
import Detalles from './src/screens/ProductDetails';
import RecuperarClaveCorreo from './src/screens/RecoverEmailPassword';
import Verificar from './src/screens/VerifyCode';
import Actualizar from './src/screens/UpdatePassword';
import CommentsProduct from './src/screens/Comments';
//Pantalla que se va a cargar deespues del splash screen
const Stack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboard');
    }, 3000); // 3 segundos

    return () => clearTimeout(timer);
  }, [navigation]); //Luego de los tres segundos se enviará al login

  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashText}>WELCOME</Text>
      <Image 
        source={require('./src/imagenes/equipo.png')}
        style={styles.splashImage}
      />
    </View>
  );
};
//

const Onboard = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

  useEffect(() => {
    // Definir una función asíncrona dentro de useEffect
    const checkAppLaunch = async () => {
      try {
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        if (appData == null) {
          setIsAppFirstLaunched(true);
          AsyncStorage.setItem('isAppFirstLaunched', 'false');
        } else {
          setIsAppFirstLaunched(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Llamar a la función asíncrona
    checkAppLaunch();
  }, []);
  return (
      isAppFirstLaunched != null && (
          <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="OnboardingScreen">
                  {isAppFirstLaunched && (
                      <Stack.Screen
                          name="OnboardingScreen"
                          component={OnboardingScreen}
                      />
                  )}
                  <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboard" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={TabNavigation} /> 
        <Stack.Screen name="Products" component={MyComponent} /> 
        <Stack.Screen name="Detalles" component={Detalles} />
        <Stack.Screen name="RecoverEmailPassword" component={RecuperarClaveCorreo}/>
        <Stack.Screen name="VerifyCode" component={Verificar}/>
        <Stack.Screen name="UpdatePassword" component={Actualizar}/>
        <Stack.Screen name="CommentsProduct" component={CommentsProduct}/>
              </Stack.Navigator>
          </NavigationContainer>
      )
  );
};



const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  splashText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});

export default Onboard;
