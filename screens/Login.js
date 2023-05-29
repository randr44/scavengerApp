import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

// formik
import { Formik } from 'formik';
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID, EXPO_CLIENT_ID } from '@env';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

// style
import { 
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    MsgBox,
    StyledButton,
    ButtonText,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
} from '../components/styles';

import { View, ActivityIndicator, Text, Image, StyleSheet } from 'react-native';

// colors-o
const { brand, primary, darkLight } = Colors;

// keyboard avoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

// api client axios
import axios from 'axios';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';
WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
    const [accessToken, setAccessToken] = useState(null);
    const [userData, setUserData] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        expoClientId: EXPO_CLIENT_ID,
    });

    // context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    const getUserInfo = async () => {
        let res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        res.json().then((data) => {
            console.log('data', data);
            setUserData(data);
        });
    };
    const persistLogin = (credentials, message, status) => {
        console.log('credentials', credentials)
        AsyncStorage.setItem('scavenger_hunt_token', JSON.stringify(credentials))
        .then(() => {
            handleMessage(message, status);
            console.log('credentials', credentials);
            setStoredCredentials(credentials);
            navigation.navigate('Welcome', { ...credentials });
        })
        .catch((error) => {
            console.log('error', error);
            handleMessage('Persisting login failed.');
        }); 
    };

    useEffect(() => {
        if (response?.type === 'success') {
            setAccessToken(response?.authentication?.accessToken);
        }
    }, [response]);

    useEffect(() => {
        if (userData !== null) {
            handleMessage('Google signin successful', 'SUCCESS');
            persistLogin({...userData}, message, 'SUCCESS');
        } 
    }, [userData]);

    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const handleLogin = async(credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'https://scavhunt.cyclic.app/api/v1/user'; // change to your url https://scavhunt.cyclic.app/api/v1/
        axios
        .post(url, credentials)
        .then((response) => {
            const result = response.data;
            console.log('resultDATA', result)
            console.log('result', response)
            const {message, status, data} = response;
            if (status !== 200) {
                handleMessage(message, status);
            } else {
                persistLogin({...data}, message, status);
            }
            setSubmitting(false);
        })
        .catch((error) => {
            setSubmitting(false);
            handleMessage('An error occurred in the login process.', 'FAILED');
        });
    };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style="dark" />
            <InnerContainer>
                <PageLogo resizeMode="cover" source={require('../assets/callowayprintslogo.jpg')} />
                <PageTitle>Scavenger Hunt</PageTitle>
                <SubTitle>Account Login</SubTitle>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(values, { setSubmitting}) => {
                        if (values.email == '' || values.password == '') {
                            handleMessage('Please fill in all fields.');
                            setSubmitting(false);
                        } else {
                            handleLogin(values, setSubmitting);
                        }
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                        <StyledFormArea>
                            <MyTextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="email@abc.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />

                            <MyTextInput
                                label="Password"
                                icon="lock"
                                placeholder="* * * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>
                           
                           {!isSubmitting && (
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>Login</ButtonText>
                                </StyledButton>
                            )}

                            {isSubmitting && (
                                <StyledButton disabled={true}>
                                    <ActivityIndicator size="large" color={primary} />
                                </StyledButton>
                            )}
                            <Line />
                            <StyledButton disabled={!request} onPress={() => 
                                accessToken ? getUserInfo() : 
                                promptAsync({ showInRevents: true})
                                } google={true}>
                                <Fontisto name="google" color={primary} size={25} />
                                <ButtonText google={true}>{accessToken ? 'Get User Data':'Sign in with Google'}</ButtonText>
                            </StyledButton>
                            <ExtraView>
                                <ExtraText>Don't have an account already? </ExtraText>
                                <TextLink onPress={() =>  navigation.navigate("Signup")}>
                                    <TextLinkContent>Signup</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                </Formik>
            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={darkLight} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover'
    }
});

export default Login;