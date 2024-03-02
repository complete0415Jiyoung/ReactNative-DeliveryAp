import React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

interface DismissKeyboardViewProps {
  style?: StyleProp<ViewStyle>;
}

const DismissKeyboardView: React.FC<DismissKeyboardViewProps> = ({
  children,
  style,
  ...props
}) => (
  <TouchableWithoutFeedback
    onPress={() => Keyboard.dismiss()}
    accessible={false}>
    <KeyboardAwareScrollView
      {...props}
      behavior={Platform.OS === 'android' ? 'position' : 'padding'}
      style={style}>
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboardView;
