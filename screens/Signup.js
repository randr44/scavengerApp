import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Formik } from 'formik';

// icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import { StyledContainer, InnerContainer, PageLogo, PageTitle, SubTitle, StyledFormArea, LeftIcon, StyledInputLabel, StyledTextInput, RightIcon, Colors, StyledButton, ButtonText, MsgBox, Line, ExtraText, ExtraView, TextLink, TextLinkContent } from '../components/styles';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native'

// colors
const { brand, darkLight, primary } = Colors;
import { baseAPIUrl } from '../components/shared';

//date picker
import DateTimePicker from '@react-native-community/datetimepicker';

// api client
import axios from 'axios';

// keyboard avoiding view
import KeyboardAvoidingWrapper from '../components/Containers/KeyboardAvoidingWrapper';

//credentials context
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    // actual date of birth value to be sent
    const [dob, setDob] = useState();

    
    // context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    const onChange = (event, selectedDate) => {
        console.log('event', event);
        console.log('selectedDate', selectedDate);
        const currentDate = selectedDate || date;
        console.log('currentDate', typeof selectedDate);
        setShow(false);
        setDate(currentDate);
        setDob(currentDate);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    // form handling
    const handleSignup = async (credentials, setSubmitting) => {
        handleMessage(null);
        const url = `${baseAPIUrl}/user/signup`;
        axios
        .post(url, credentials, {
            validateStatus: () => true,
        })
        .then((response) => {
            const result = response.data;
            if (response.status !== 200) {
                handleMessage(result, 'FAILED!');
            } else {
                // move to account verification screen
                temporaryUserPersist({ email, fullName, dateOfBirth, password, confirmedPassword} = credentials);
                setStoredCredentials(credentials);
                navigation.navigate('Verification', { ...result });
                // persistLogin({...data}, message, status);
            }
            setSubmitting(false);
        })
        .catch((error) => {
            console.log('error', error.JSON());
            setSubmitting(false);
            handleMessage('An error occurred. Check your network and try again.');
        });
    };

    const temporaryUserPersist = async (credentials) => {
        try {
            await AsyncStorage.setItem('tempUser', JSON.stringify(credentials))
        } catch (error) {
            handleMessage('Error with initial data handling.');
        }
    };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    };

    // const persistLogin = (credentials, message, status) => {
    //     AsyncStorage.setItem('scavenger_hunt_token', JSON.stringify(credentials))
    //     .then(() => {
    //         handleMessage(message, status);
    //         setStoredCredentials(credentials);
    //         navigation.navigate('Welcome', { ...credentials });
    //     })
    //     .catch((error) => {
    //         console.log('error', error.JSON());
    //         handleMessage('Persisting login failed.');
    //     });
    // };


    return (
        <>
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark" />
                <InnerContainer>
                    <PageTitle>Scavenger Hunt</PageTitle>
                    <SubTitle>Account Signup</SubTitle> 
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
                    <Formik
                        initialValues={{ name: '', email: '', dateOfBirth: '',  password: '', confirmedPassword: ''  }}
                        onSubmit={(values, {setSubmitting}) => {
                            values = {...values, dateOfBirth: dob}
                            if (values.email == '' || values.password == '' || values.name == '' || values.dateOfBirth == '' || values.confirmedPassword == '') {
                                handleMessage('Please fill all the fields');
                                setSubmitting(false);
                                console.log(values);
                            } else if (values.password !== values.confirmedPassword) {
                                handleMessage('Passwords do not match');
                                setSubmitting(false);
                            } else {
                                handleSignup(values, setSubmitting);
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (<StyledFormArea>
                            <MyTextInput
                                label="Full Name"
                                icon="person"
                                placeholder="Richard Roe"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.fullName}
                            />
                            <MyTextInput
                                label="Email Address"
                                icon="mail"
                                placeholder="amber@gmail.com"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput
                                label="Date of Birth"
                                icon="calendar"
                                placeholder="YYYY - MM - DD"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('dateOfBirth')}
                                onBlur={handleBlur('dateOfBirth')}
                                value={dob ? dob.toDateString() : ''}
                                isDate={true}
                                editable={false}
                                showDatePicker={showDatePicker}
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
                            <MyTextInput
                                label="Confirm Password"
                                icon="lock"
                                placeholder="* * * * * * * *"
                                placeholderTextColor={darkLight}
                                onChangeText={handleChange('confirmedPassword')}
                                onBlur={handleBlur('confirmedPassword')}
                                value={values.confirmedPassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword={setHidePassword}
                            />
                            <MsgBox type={messageType}>{message}</MsgBox>
                            {!isSubmitting && (
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Signup</ButtonText>
                            </StyledButton>
                            )}
                            {isSubmitting && (
                            <StyledButton disabled={true}>
                                <ActivityIndicator size="large" color={primary} />
                            </StyledButton>
                            )}
                            <Line />
                            <ExtraView>
                                <ExtraText>Already have an account? </ExtraText>
                                    <TextLink onPress={() => navigation.navigate("Login")}>
                                        <TextLinkContent>
                                           Login
                                        </TextLinkContent>
                                    </TextLink>
                            </ExtraView>
                        </StyledFormArea>)}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
        </>
    )
}

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} />}
            {isDate && (
                <TouchableOpacity onPress={showDatePicker}>
                    <StyledTextInput {...props} />
                </TouchableOpacity>
            )}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}

export default Signup;