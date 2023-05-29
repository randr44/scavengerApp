import React, { useContext} from 'react';
import { StatusBar } from 'expo-status-bar';

import { InnerContainer, PageTitle, SubTitle, StyledFormArea, StyledButton, ButtonText, Line, WelcomeContainer, WelcomeImage, Avatar } from '../components/styles';

//credentials context
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './../components/CredentialsContext';

const Welcome = () => { // removed {navigation, route} from parameters
    // console.log('navigation', navigation);
    // console.log('route.params', route.params);
    // console.log('route', route)
    // const {name, email, picture} = route.params;

    
    // context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const { name, email, picture } = storedCredentials;

    const AvatarImg = picture ? {uri: picture} : require('../assets/3162367.jpg');
    const clearLogin = () => {
        AsyncStorage.removeItem('scavenger_hunt_token')
        .then(() => {
            setStoredCredentials('');
        })
        .catch(error => console.log(error));
    };



    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('../assets/finger-2081169.jpg')} />
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome!</PageTitle>
                    <SubTitle welcome={true}>{name || 'Friend'}</SubTitle>
                    <SubTitle welcome={true}>{email || 'friend@gmail.com'}</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={AvatarImg} />
                            <Line />
                            <StyledButton onPress={clearLogin}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    )
}

export default Welcome;