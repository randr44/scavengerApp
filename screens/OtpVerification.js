import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../components/Containers/KeyboardAvoidingWrapper';
import CodeInputField from '../components/CodeInputField';

// api client
import axios from 'axios';

// api route
import { baseAPIUrl } from '../components/shared';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from '../components/CredentialsContext';

import { 
    StyledContainer,
    TopHalf,
    BottomHalf,
    IconBg,
    Colors,
    InfoText,
    PageTitle,
    EmphasizeText,
    StyledButton,
    ButtonText
} from '../components/styles';
import { Octicons, Ionicons } from '@expo/vector-icons'
import { ActivityIndicator } from 'react-native';

import ResendTimer from '../components/ResendTimer';

import VerificationModal from '../components/VerificationModal';

const { brand, green, primary, lightGreen, gray } = Colors;
const Verification = ({ route }) => {
    const [code, setCode] = useState('');
    const [pinReady, setPinReady] = useState(false);

    // verification button
    const [verifying, setVerifying] = useState(false);
    
    const MAX_CODE_LENGTH = 4;

    // modal
    const [modalVisible, setModalVisible] = useState(false);
    const [verificationSuccessful, setVerificationSuccessful] = useState(false);
    const [requestMessage, setRequestMessage] = useState('');


    const [timeLeft, setTimeLeft] = useState(null);
    const [targetTime, setTargetTime] = useState(null);
    const [activeResend, setActiveResend] = useState(false);

    const [resendingEmail, setResendingEmail] = useState(false);
    const [resendState, setResendState] = useState(false);

    let resendTimerInterval;

    const { email, userId } = route?.params;

    const triggerTimer = (targetTimeInSeconds = 60) => {
        setTargetTime(targetTimeInSeconds);
        setActiveResend(false);
        const finalTime = +new Date() + targetTimeInSeconds * 1000;
        resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000);
    };

    const calculateTimeLeft = (finalTime) => {
        const difference = finalTime - +new Date();
        if (difference >= 0) {
            setTimeLeft(Math.round(difference / 1000));
        } else {
            clearInterval(resendTimerInterval);
            setActiveResend(true);
            setTimeLeft(null);
        }
    };

    useEffect(() => {
        triggerTimer();
        return () => {
            clearInterval(resendTimerInterval);
        };
    }, []);

    const resendEmail = async () => {
        setResendingEmail(true);
        // make request
        const url = `${baseAPIUrl}/otp/`;
        try {
            await axios.post(url, { email, userId }, {
                validateStatus: () => true
            });
            setResendState('Sent!');
        } catch (error) {
            setResendState('Failed!');
            alert('Resending verification email failed!')
        }
        setResendingEmail(false);
        // hold on message
        setTimeout(() => {
            setResendState('Resend');
            setActiveResend(false);
            triggerTimer();
        }
        , 5000);
    };

    const submitOTPVerification = async () => {
        console.log('submitting otp verification')
        // make request
        try {
            setVerifying(true);
            const url = `${baseAPIUrl}/email_verification/verify/`;
            const result = await axios.post(url, { email, otp: code}, {
                validateStatus: () => true
            });
            console.log('result', result);
            const { data } = result;
            console.log('data', data.valid);

            if (!data.verified) {
                setVerificationSuccessful(false);
                setRequestMessage(data.data);
            } else {
                setVerificationSuccessful(true);
            }
            setModalVisible(true);
            setVerifying(false);
        } catch (error) {
            setRequestMessage(error.message);
            setVerificationSuccessful(false);
            setModalVisible(true);
            setVerifying(false);
        }
    };

    // credentials context
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

    // persist login after verification
    const persistLoginAfterVerification = async () => {
        try {
            const tempUser = await AsyncStorage.getItem('tempUser');
            await AsyncStorage.setItem('scavenger_hunt_credentials', JSON.stringify(tempUser));
            setStoredCredentials(JSON.parse(tempUser));
        } catch (error) {
            alert(`Error with persisting user data. `);
        }
    };
    
    return (
        <KeyboardAvoidingWrapper>
        <StyledContainer
            style={{alignItems: 'center'}}
        >
            <TopHalf>
                <IconBg>
                    <StatusBar style="dark" />
                    <Octicons name="lock" size={125} color={ brand } />
                </IconBg>
            </TopHalf>
            <BottomHalf>
            <PageTitle style={{ fontSize: 25 }}>Account Verification</PageTitle>
            <InfoText style={{ fontSize: 16 }}>Please enter the 4-digit code sent to:
                <EmphasizeText>{` ${email} `}</EmphasizeText>
            </InfoText>
            <CodeInputField
                setPinReady={setPinReady}
                code={code}
                setCode={setCode}
                maxLength={MAX_CODE_LENGTH}
            />

            {!verifying && pinReady && (
                <StyledButton
                    style={{ backgroundColor: green,
                    flexDirection: 'row'
                }}
                onPress={submitOTPVerification}
            >
                <ButtonText>Verify </ButtonText>
                <Ionicons name="checkmark-circle" size={25} color={primary} />
            </StyledButton>
            )}
             {!verifying && !pinReady && (
                <StyledButton
                    disabled={true}
                    style={{ backgroundColor: lightGreen,
                    flexDirection: 'row'
                }}
                onPress={submitOTPVerification}
            >
                <ButtonText style={{ color: gray }}>Verify </ButtonText>
                <Ionicons name="checkmark-circle" size={25} color={primary} />
            </StyledButton>
            )}
             {verifying && (
                <StyledButton
                    disabled={true}
                    style={{ backgroundColor: lightGreen,
                    flexDirection: 'row'
                }}
                onPress={submitOTPVerification}
            >
                <ActivityIndicator size="large" color={primary} />
            </StyledButton>
            )}
            <ResendTimer
                activeResend={activeResend}
                resendingEmail={resendingEmail}
                resendStatus={resendState}
                timeLeft={timeLeft}
                targetTime={targetTime}
                resendEmail={resendEmail}
            />
            </BottomHalf>
            <VerificationModal
                successful={verificationSuccessful}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                requestMessage={requestMessage}
                persistLoginAfterVerification=
                {persistLoginAfterVerification}
            />
        </StyledContainer>
    </KeyboardAvoidingWrapper>
    )
};

export default Verification;