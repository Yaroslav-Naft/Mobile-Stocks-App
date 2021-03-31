import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const BoughtStockListItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.headText}>{props.item.stockName}</Text>
        <Text style={styles.subText}>{props.item.company}</Text>
        <Text style={styles.numText}>@{props.item.boughtAmount}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.subText}>Market Value</Text>
        <Text style={styles.numText}>{props.item.marketPrice*props.item.boughtAmount}</Text>
        <Text style={styles.subText}>P/L</Text>
        <Text style={styles.numText}>{(props.item.marketPrice-props.item.boughtPrice)*props.item.boughtAmount}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.subText}>Market Price</Text>
        <Text style={styles.numText}>{props.item.marketPrice}</Text>
        <Text style={styles.subText}>Bought Price</Text>
        <Text style={styles.numText}>{props.item.boughtPrice}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1
  },
  block: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  headText: {
    fontSize: 10
  },
  subText: {
    color: '#A8DADC',
    fontSize: 8
  },
  numText: {
    fontSize: 8
  }
})
  
export default BoughtStockListItem