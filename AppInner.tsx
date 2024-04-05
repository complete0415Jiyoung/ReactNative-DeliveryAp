import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './src/pages/Settings';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import { useSelector } from 'react-redux';
import { RootState } from './src/store/reducer';
import useSocket from './src/hock/useSocket';
import {useEffect} from 'react'
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import Config from 'react-native-config';
import userSlice from './src/slices/user';
import { useAppDispatch } from './src/store';
import { Alert } from 'react-native';
import orderSlice from './src/slices/order';

export type LoggedInParamList = {
  Orders: undefined;
  Settings: undefined;
  Delivery: undefined;
  Complete: {orderId: string};
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const dispatch = useAppDispatch()
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const [socket, disconnect] = useSocket();

  // 키, 값
  // 'hello','world'
  // 'userInfo', {name:'jilong', brith: 1997}
  // 'order', {orderId: '1312s', price: 9000, latitude: 37.5, longitude: 127.5 }

  useEffect(() => {
    const callback = (data: any) => {
      console.log(data);
      dispatch(orderSlice.actions.addOrder(data));  // 리듀서로 보내기 
    };
    if (socket && isLoggedIn) {
      socket.emit('acceptOrder', 'hello');// 서버 연결하기
      socket.on('order', callback); // 서버에게 데이터 받기 
    }
    return () => {
      if (socket) {
        socket.off('order', callback); // 데이터 그만 받기
      }
    };
  }, [isLoggedIn, socket]);

  // 로그인이 되면 socket 생성 
  useEffect(() => {
    if (!isLoggedIn) {
      console.log('!isLoggedIn', !isLoggedIn);
      disconnect();
    }
  }, [dispatch, isLoggedIn, disconnect]);


  // 앱 실행 시 토큰 있으면 로그인하는 코드 
  useEffect(()=>{
    const getTokenAndRefresh = async() =>{
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token){ // 토큰이 없다면 돌아가서 로그인을 다시해라 
          return;
        }
        const response = await axios.post(
          `${Config.API_URL}/refreshToken`, 
          {},
          {
            headers:{
              Authorization:`Bearer ${token}`,
            },
          },
        );
        dispatch(
          userSlice.actions.setUser({
            name: response.data.data.name,
            email: response.data.data.email,
            accessToken: response.data.data.accessToken
          }),
        );
      }catch(error){
        console.error(error);
        if((error as AxiosError).response?.data.code === 'expired'){
          Alert.alert('알림', '다시 로그인 해주세요.')
        }
      } finally{
        // TODO: 스플래시 스크린 없애기 

      }
    };
    getTokenAndRefresh();
  },[dispatch])
  
  return (
      <NavigationContainer>
        {isLoggedIn ? (
          <Tab.Navigator>
            <Tab.Screen
              name="Orders"
              component={Orders}
              options={{title: '오더 목록'}}
            />
            <Tab.Screen
              name="Delivery"
              component={Delivery}
              options={{headerShown: false}}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{title: '내 정보'}}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{title: '로그인'}}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{title: '회원가입'}}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
  );
}

export default AppInner;

