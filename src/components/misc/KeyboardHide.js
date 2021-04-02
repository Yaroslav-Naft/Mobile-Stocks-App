import React from "react"
import { Keyboard, StyleSheet, View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';

export const KeyboardHide = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );