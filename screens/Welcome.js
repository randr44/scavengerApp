import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { InnerContainer, PageTitle, SubTitle, StyledFormArea, StyledButton, ButtonText, Line, WelcomeContainer, WelcomeImage, Avatar } from '../components/styles';

const Welcome = ({navigation, route}) => {
    console.log('navigation', navigation);
    console.log('route.params', route.params);
    console.log('route', route)
    const {name, email} = route.params;
    return (
        <>
            <StatusBar style="light" />
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('../assets/finger-2081169.jpg')} />
                <WelcomeContainer>
                    <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
                    <SubTitle welcome={true}>{name || 'Friend'}</SubTitle>
                    <SubTitle welcome={true}>{email || 'friend@gmail.com'}</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('../assets/3162367.jpg')} />
                            <Line />
                            <StyledButton onPress={() => {navigation.navigate('Login')}}>
                            <ButtonText>Logout</ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    )
}

export default Welcome;