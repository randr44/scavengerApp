import React from 'react';

import { Colors } from './../components/styles';

const { primary, brand, darkLight, tertiary } = Colors;
// react navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import { CredentialsContext } from './../components/CredentialsContext';

const Stack = createStackNavigator();
const RootStack = () => {
    return (
        <CredentialsContext.Consumer>
            {({storedCredentials}) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyled: {
                                backgroundColor: 'transparent'
                            },
                            headerTintColor: tertiary,
                            headerTransparent: true,
                            headerTitle: '',
                            headerLeftContainerStyle: {
                            paddingLeft: 20
                         }
                     }}
                     initialRouteName='Login'
                 >
                    { storedCredentials ? ( 
                        <Stack.Screen options={{ headerTintColor: primary }}
                            name="Welcome" component={Welcome} />
                        ) : (
                        <>
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen name="Signup" component={Signup} />
                        </>
                        )
                    } 
                 </Stack.Navigator>
             </NavigationContainer>
            )}
        </CredentialsContext.Consumer>
    );
}

export default RootStack;   