import React from "react"
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export const KeyboardHide = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);