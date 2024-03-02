import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from './src/pages/Settings';
import Orders from './src/pages/Orders';
import Delivery from './src/pages/Delivery';
import {useState} from 'react';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';

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

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
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

export default App;


/** TypeScript란?
 *  : 매개 변수, 리턴값 , 변수에 타입을 정해두는 것 을 의미
 *  [장점] 에러에 대한 대처가 유용함,  
 * */

 /*** SafeAreaView
   * - react-navigation에서 알아서 제공해줌 ^^
   * - 핸드폰 디바이스 숨겨진 부분을 제외하고 화면이 깨지지 않도록 보호
   *** View 
   * - flexDirection: 'row' 가로로 바꾸기
   * - disply 같음 
   * - flex 속성: 형제끼리 부모 컴포넌트안에서의 비율을 지정함 
   *******************************************************
   *** 버튼-> onClick이 아니라 onPress
   * Pressable: 다양한 터치효과를 커스터마이징이 가능
	<Pressable onPress={onClick}
        style={{
          // padding:20,
          paddingHorizontal: 40, // 좌우
          paddingVertical: 20, // 상하
          backgroundColor: 'blue'
        }}>
   * Button: 간단한 터치기능의 기본적인 스타일 
   * TouchableHighlight: 기본 Hover 검정색이지만 'underlayColor'속성으로 색 변경가능
	<TouchableHighlight underlayColor='gray' onPress={onClick}>
   * TouchableOpacity: 기본 Hover 흐릿 
   * TouchableWithoutFeedback: 효과 없이 터치 이벤트 만 
   * TouchableNativeFeedback : 안드로이드에서 사용가능한 터치백  
   */