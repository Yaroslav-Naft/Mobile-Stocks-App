import React from "react"
import { Keyboard, StyleSheet, View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';

export const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );