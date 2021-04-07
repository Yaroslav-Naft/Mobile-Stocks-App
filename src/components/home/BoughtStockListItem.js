import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const BoughtStockListItem = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.headText}>{props.item.symbol}</Text>
        <Text style={styles.numText}>@{props.item.numShares}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.subText}>Avg Price</Text>
        <Text style={styles.numText}>{props.item.avgPrice.toFixed(2)}</Text>
        <Text style={styles.subText}>Total Cost</Text>
        <Text style={styles.numText}>{(props.item.avgPrice * props.item.numShares).toFixed(2)}</Text>
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
    margin: 10,
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
    fontSize: 20,
    paddingBottom: 10
  },
  subText: {
    color: '#457B9D',
    fontSize: 10
  },
  numText: {
    fontSize: 15,
  }
})

export default BoughtStockListItem