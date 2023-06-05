import React from 'react';

// keyboard avoiding view
import { KeyboardAvoidingView, Keyboard, ScrollView, Pressable, Platform } from 'react-native';
import { Colors } from './../styles';
const { primary} = Colors;

const KeyboardAvoidingWrapper = ({children}) => {
    return (
        <KeyboardAvoidingView
            style={{flex: 1, backgroundColor: primary}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={60}
            >
            <ScrollView showVerticalScrollIndicator={false}>
                <Pressable onPress={Keyboard.dismiss}>
                    {children}
                </Pressable>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingWrapper;