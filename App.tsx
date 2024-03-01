import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  Text,
  View,
  Pressable, Button, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, TouchableNativeFeedback
} from 'react-native';
import {useCallback} from 'react';


/** TypeScript란?
 *  : 매개 변수, 리턴값 , 변수에 타입을 정해두는 것 을 의미
 *  [장점] 에러에 대한 대처가 유용함,  
 * */ 
type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};
type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DetailsScreenProps = NativeStackScreenProps<ParamListBase, 'Details'>;

function HomeScreen({navigation, route}: HomeScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Details');
  }, [navigation]);
  
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
   * Button: 간단한 터치기능의 기본적인 스타일 
   * TouchableHighlight: 기본 Hover 검정색이지만 'underlayColor'속성으로 색 변경가능
   * TouchableOpacity: 기본 Hover 흐릿 
   * TouchableWithoutFeedback: 효과 없이 터치 이벤트 만 
   * TouchableNativeFeedback : 안드로이드에서 사용가능한 터치백  
   */
  return (
    <View style={{flexDirection: 'row'}}>
      <View style={{ flex: 5, backgroundColor:'pink', alignItems: 'flex-end', justifyContent: 'center'}}>
        {/* <TouchableHighlight underlayColor='gray' onPress={onClick}> */}
        <Pressable onPress={onClick}
        style={{
          // padding:20,
          paddingHorizontal: 40, // 좌우
          paddingVertical: 20, // 상하
          backgroundColor: 'blue'
        }}>
          <Text style={{color:'white'}}>Home Screen</Text>
        </Pressable>  
        {/* </TouchableHighlight> */}
      </View>
      <View style={{flex:2, backgroundColor:'purple'}}>
        <Text style={{color:'white'}}>Second</Text>
      </View>
    </View>
  );
}

function DetailsScreen({navigation}: DetailsScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TouchableHighlight onPress={onClick}>
        <Text>Details Screen</Text>
      </TouchableHighlight>
    </View>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: '홈화면'}}
        />
        <Stack.Screen name="Details" component={DetailsScreen}>
          {/* {props => <DetailsScreen {...props} />} */}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;