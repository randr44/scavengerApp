import styled from 'styled-components';
import { View, Image, Text } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;
export const Colors = {
    primary: '#ffffff',
    secondary: '#E5E7EB',
    tertiary: '#1F2937',
    darkLight: '#9CA3AF',
    brand: '#6D28D9',
    green: '#10B981',
    red: '#EF4444',
    lightGreen: 'rgba(16, 185, 129, 0.1)',
    gray: '#6B7280'
};

const {
    primary,
    secondary,
    tertiary,
    darkLight,
    brand,
    green,
    red,
    lightGreen,
    gray
} = Colors;

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: ${primary};
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;

    ${(props) => props.welcome == true && `
        font-size: 35px;
    `}
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${tertiary};

    ${(props) => props.welcome == true && `
    margin-bottom: 5px;
    font-weight: normal;
`}
`;

export const StyledFormArea = styled.View`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
    color: ${tertiary};
    font-size: 13px;
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${brand};
    justify-content: center;
    border-radius: 5px;
    margin-vertical: 5px;
    align-items: center;
    height: 60px;

    ${(props) => props.google == true && `
        background-color: ${green};
        flex-direction: row;
        justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: 16px;

    ${(props) => props.google == true && `
        padding-left: 25px;
`}
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
    color: ${props => props.type === 'SUCCESS' ? green : red};
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 25px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    color: ${darkLight};
    font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    color: ${brand};
    font-size: 15px;
`;

export const TextLinkContent = styled.Text`
    color: ${brand};
    font-size: 15px;

    ${(props) => {
        const { resendStatus } = props;
        if (resendStatus === 'Failed!') {
            return `
                color: ${red};
            `;
        } else if (resendStatus === 'Sent!') {
            return `
                color: ${green};
            `;
        }
    }}
`;

export const ListContainer = styled.View`
    width: 90%;
    align-items: center;
`;

export const ListItem = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${secondary};
    justify-content: center;
    border-radius: 5px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    margin: auto;
    border-radius: 50px;
    border-width: 2px;
    border-color: ${secondary};
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const ListItemText = styled.Text`
    color: ${tertiary};
    font-size: 16px;
`;

export const WelcomeContainer = styled(InnerContainer)`
    padding: 25px;
    padding-top: 10px;
    justify-content: center;
`;

export const WelcomeImage = styled.Image`
    height: 50%;
    width: 100%;
`;

export const WelcomeText = styled.Text`
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: ${brand};
    padding: 10px;
    padding-bottom: 20px;
`;

export const AvatarContainer = styled.TouchableOpacity`
    position: absolute;
    top: 50%;
    align-self: center;
`;

export const IconBg = styled.View`
    width: 250px;
    height: 250px;
    background-color: ${lightGreen};
    border-radius: 250px;
    justify-content: center;
    align-items: center;
`;
export const TopHalf = styled.View`
    flex: 1;
    justify-content: center;
    padding: 20px;
`;

export const BottomHalf = styled(TopHalf)`
    justify-content: space-around;
`;

export const InfoText = styled.Text`
    font-size: 15px;
    text-align: center;
    color: ${gray};
`;

export const EmphasizeText = styled.Text`
    font-weight: bold;
    font-style: italic;
`;

export const InlineGroup = styled.View`
    flex-direction: row;
    justify-content: center;
    padding: 10px;
    align-items: center;
`;

// modal styles
export const ModalContainer = styled(StyledContainer)`
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,0.7);
`;

export const ModalView = styled.View`
    margin: 20px;
    background-color: white;
    border-radius: 20px;
    padding: 35px;
    align-items: center;
    elevation: 5;
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
    width: 100%;
`;

export const CodeInputSection = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-vertical: 30px;
`;


export const HiddenTextInput = styled.TextInput`
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
`;
export const CodeInputsContainer = styled.Pressable`
    width: 70%;
    flex-direction: row;
    justify-content: space-between;
`;

export const CodeInput = styled.View`
    border-color: ${lightGreen};
    min-width: 15%;
    border-width: 2px;
    border-radius: 5px;
    padding: 12px;
`;

export const CodeInputText = styled.Text`
    font-size: 22px;
    font-weight: bold;
    color: ${brand};
    text-align: center;
`;

export const CodeInputFocused = styled(CodeInput)`
    border-color: ${green};
`;


