import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import ProfileScreen from '../screens/ProfileScreen';
import MisCompras from '../screens/MyOrders';
import ProductsScreen from '../screens/ProductScreen';
import CartScreen from '../screens/Cart';
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';

                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Productos') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'Cart') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'Cart') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    } else if (route.name === 'Login') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'SignUp') {
                        iconName = focused ? 'person' : 'person-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false, // Puedes ocultar el header si no lo necesitas
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ title: 'Inicio' }} // Ajusta el título de la pestaña según sea necesario
            />
            <Tab.Screen
                name="Productos"
                component={ProductsScreen}
                options={{ title: 'Productos' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Perfil' }}
            />
            <Tab.Screen
                name="Settings"
                component={MisCompras}
                options={{ title: 'Mis compras' }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{ title: 'Carrito' }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;
