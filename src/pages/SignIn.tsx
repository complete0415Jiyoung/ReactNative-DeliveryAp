import React, { useCallback, useRef, useState }  from "react";
import { StyleSheet, Alert, Pressable, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../../App";
import {NativeStackScreenProps} from '@react-navigation/native-stack'

function SignIn({navigation}:NativeStackScreenProps<RootStackParamList, 'SignIn'>){

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const emailRef = useRef<TextInput|null>(null);
    const passwordRef = useRef<TextInput|null>(null);

    const onChangeEmail = useCallback((text)=>{
        setEmail(text)
    },[])
    const onChangePassword = useCallback((text)=>{
        setPassword(text)
    },[])

    const onSubmit = useCallback(()=>{
        if(!email || !email.trim()){
            Alert.alert('알림', '이메일을 입력해주세요');
        }
        if(!password || !password.trim()){
            Alert.alert('알림', '비밀번호를 입력해주세요');
        }
        Alert.alert('알림', '로그인되었습니다.');
    },[email, password]);

    const toSignUp = useCallback(()=>{
        navigation.navigate('SignUp')
    },[navigation])

    const canGoNext = email && password;

    return(
        <View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>이메일</Text>
                <TextInput 
                    value={email}
                    style={styles.textInput}
                    onChangeText={onChangeEmail}
                    placeholder="이메일을 입력해주세요"
                    importantForAutofill="yes" // 자동완성
                    keyboardType="email-address" 
                    autoComplete="email" //  속성 값 중 otp 문자값 바로 들어오게
                    textContentType="emailAddress"
                    returnKeyType="next"
                    onSubmitEditing={()=>{   // -> 이메일 작성 후 엔터 눌렀을 때 비밀번호 Input창으로 이동
                        passwordRef.current?.focus();
                    }}
                    blurOnSubmit={false}
                    ref={emailRef}
                    clearButtonMode="while-editing" // 아이폰에 적용 'X' 누르면 값이 지워짐
                />
            </View>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>비밀번호</Text>
                <TextInput
                    value={password}
                    secureTextEntry // 비밀번호 안보이게
                    style={styles.textInput}
                    onChangeText={onChangePassword}
                    placeholder="비밀번호을 입력해주세요"
                    importantForAutofill="yes"
                    autoComplete="password"
                    textContentType="password"
                    ref={passwordRef}
                    onSubmitEditing={onSubmit}
                />
            </View>
            <View style={styles.buttonZone}>
                <Pressable onPress={onSubmit} 
                    style={
                        !canGoNext 
                        ? styles.loginButton
                        : [styles.loginButton, styles.loginButtonAtive]
                    } 
                    disabled ={!canGoNext} 
                >
                    <Text style={styles.loginButtonText}>로그인</Text>
                </Pressable>
                <Pressable onPress={toSignUp}>
                    <Text>회원가입하기</Text>
                </Pressable>
            </View>
        </View>
    ) 
}

const styles = StyleSheet.create({
    inputWrapper:{
        padding: 20
    },
    loginButton:{
        backgroundColor:'gray',
        paddingHorizontal: 20,
        paddingVertical:10,
        borderRadius:5,
        marginBottom:10

    },
    loginButtonAtive:{
        backgroundColor:'blue'
    },
    loginButtonText:{
        color:'white',
        fontSize: 16,
    },
    buttonZone:{
        alignItems:'center'
    },
    label:{
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 20
    },
    textInput:{
        padding:5,
        borderBottomWidth: StyleSheet.hairlineWidth
    }
})

export default SignIn;