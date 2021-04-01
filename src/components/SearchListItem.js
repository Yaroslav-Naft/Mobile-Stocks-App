import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SearchListItem = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.item['1. symbol']}</Text>
      <Text style={styles.companyText}>{props.item['2. name']}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10
  },
  text: {
    color: '#FFFFFF',
    fontSize: 10
  },
  companyText: {
    color: '#FFFFFF',
    fontSize: 8
  }
});
  
export default SearchListItem;