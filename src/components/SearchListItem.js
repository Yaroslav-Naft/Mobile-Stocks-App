import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const SearchListItem = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.item.stockName}</Text>
      <Text style={styles.companyText}>{props.item.company}</Text>
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