import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();


const Onboard = () => {
    const [isAppFirstLaunched, setIsAppFirstLaunched] = React.useState(null);

    React.useEffect(async () => {
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        if (appData == null) {
            setIsAppFirstLaunched(true);
            AsyncStorage.setItem('isAppFirstLaunched', 'false');
        } else {
            setIsAppFirstLaunched(false);
        }


    }, []);
    return (
        isAppFirstLaunched != null && (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {isAppFirstLaunched && (
                        <Stack.Screen
                            name="OnboardingScreen"
                            component={OnboardingScreen}
                        />
                    )}
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    );
};

export default Onboard;
