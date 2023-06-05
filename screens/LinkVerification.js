// import React, { useState, useEffect } from 'react';
// import { StatusBar } from 'expo-status-bar';

// // styles
// import { StyledContainer, TopHalf, BottomHalf, IconBg, PageTitle, InfoText, Colors, EmphasizeText, StyledButton, ButtonText } from '../components/styles';

// // icons
// import { Ionicons } from '@expo/vector-icons';

// // resend timer
// import ResendTimer from './../components/ResendTimer';

// const { primary, brand, green } = Colors;

// const Verification = () => {
//     const [resendingEmail, setResendingEmail] = useState(false);
//     const [resendStatus, setResendStatus] = useState('Resend');

//     // resend timer
//     const [timeLeft, setTimeLeft] = useState(null);
//     const [targetTime, setTargetTime] = useState(null);

//     const [activeResend, setActiveResend] = useState(false);
//     let resendTimerInterval;

//     const calculateTimeLeft = (finalTime) => {
//         const difference = finalTime - +new Date();
//         if (difference >= 0) {
//             setTimeLeft(Math.round(difference / 1000));
//         } else {
//             setTimeLeft(null);
//             clearInterval(resendTimerInterval);
//             setActiveResend(true);
//         }
//     };

//     const triggerTimer = (targetTimeInSeconds = 30) => {
//         setTargetTime(targetTimeInSeconds);
//         setActiveResend(false);
//         const finalTime = +new Date() + targetTimeInSeconds * 1000;
//         resendTimerInterval = setInterval(() => calculateTimeLeft(finalTime), 1000);
//     };

//     useEffect(() => {
//         triggerTimer();
//         return () => {
//             clearInterval(resendTimerInterval);
//         }
//     }, []);

//     const resendEmail = () => {

//     };

//     return (
//         <StyledContainer
//             style={{
//                 alignItems: 'center'
//             }}
//         >
//             <TopHalf>
//                 <IconBg>
//                     <StatusBar style='dark'/>  
//                     <Ionicons name='mail-open' size={125} color={brand}/>
//                 </IconBg>
//             </TopHalf>
//             <BottomHalf>
//                 <PageTitle style={{ fontSize: 25 }}>Account Verification</PageTitle>
//                 <InfoText>
//                     Please verify your email using the link sent to
//                     <EmphasizeText> {`test.tothepointcode@gmail.com`}</EmphasizeText>
//                 </InfoText>
//                 <StyledButton
//                     onPress={() => {}}
//                     style={{
//                         backgroundColor: green, flexDirection: 'row' 
//                     }}
//                 >
//                     <ButtonText>Proceed </ButtonText>
//                     <Ionicons name='arrow-forward-circle' size={25} color={primary}/>
//                 </StyledButton>
//                 <ResendTimer 
//                     activeResend={activeResend}
//                     resendingEmail={resendingEmail}
//                     resendStatus={resendStatus}
//                     timeLeft={timeLeft}
//                     targetTime={targetTime}
//                     resendEmail={resendEmail}
//                 />
//             </BottomHalf>   
//         </StyledContainer>
//     )
// };

// export default Verification;

